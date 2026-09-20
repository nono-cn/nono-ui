<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { FieldSet } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'

const code = shallowRef('')
const legendVariant = ref<'legend' | 'label'>('legend')
const legend = ref('Datos de contacto')
const description = ref('Usaremos estos datos para comunicarnos contigo.')
const runtimeComponent = shallowRef()
const runtimeError = shallowRef('')

function makeCode(variant: 'legend' | 'label', legendText: string, descriptionText: string) {
  return `<script setup lang="ts">
import { FieldSet } from '@nono-cn/nono-ui/components/ui/FieldSet'
import { Input } from '@nono-cn/nono-ui/components/ui/Input'
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
<\/script>

<template>
  <FieldSet
    legend="${legendText}"
    description="${descriptionText}"
    legend-variant="${variant}"
  >
    <div class="field-set-playground-field grid gap-2">
      <Label for="field-set-name">Nombre</Label>
      <Input id="field-set-name" type="text" placeholder="Tu nombre" />
    </div>
    <div class="field-set-playground-field grid gap-2">
      <Label for="field-set-email">Email</Label>
      <Input id="field-set-email" type="email" placeholder="tu@email.com" />
    </div>
  </FieldSet>
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? ''
    const script = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    void setupCode
    runtimeComponent.value = markRaw(
      defineComponent({ components: { FieldSet, Input, Label }, setup: () => ({}), render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode('legend', legend.value, description.value)
code.value = makeCode(legendVariant.value, legend.value, description.value)
runCode(code.value)

watch([legendVariant, legend, description], ([variant, legendText, descriptionText]) => {
  code.value = makeCode(variant, legendText, descriptionText)
  runCode(code.value)
})

function resetControls() {
  legendVariant.value = 'legend'
  legend.value = 'Datos de contacto'
  description.value = 'Usaremos estos datos para comunicarnos contigo.'
}
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="FieldSet playground"
    description="Agrupa controles relacionados con una leyenda y una descripción semánticas."
    :initial-code="initialCode"
    @run="runCode"
    @reset="resetControls"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="legend" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundSelect
          v-model="legendVariant"
          label="Legend variant"
          :options="['legend', 'label']"
        />
      </div>
    </template>
    <div class="field-set-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
