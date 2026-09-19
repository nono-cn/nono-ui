<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Alert } from '@/components/ui/Alert'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const label = ref('Información')
const description = ref('Tu configuración se ha guardado correctamente.')
const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft'>('soft')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('success')
const icon = ref('success')
const closable = ref(true)
const decorative = ref(false)
const color = ref('#22c55e')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
<\/script>

<template>
  <Alert
    label="${label.value}"
    description="${description.value}"
    variant="${variant.value}"
    severity="${severity.value}"
    :icon="{ name: '${icon.value}' }"
    :closable="${closable.value}"
    :decorative="${decorative.value}"${useCustomColor.value ? ` color="${color.value}"` : ''}
  />
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? ''
    const script = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const names = [...setupCode.matchAll(/(?:const|let)\s+(\w+)\s*=/g)].map((match) => match[1])
    const setup = new Function(
      'Vue',
      `const { ref, reactive, computed, watch } = Vue\n${setupCode}\nreturn { ${names.join(', ')} }`,
    )(Vue)
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Alert }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [label, description, variant, severity, icon, closable, decorative, color, useCustomColor],
  () => {
    code.value = makeCode()
    runCode(code.value)
  },
)
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Alert playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundSelect
          v-model="variant"
          label="Variant"
          :options="['solid', 'outline', 'plain', 'subtle', 'soft']"
        />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['success', 'info', 'warning', 'error', 'check']"
        />
        <PlaygroundCheckbox v-model="closable" label="Closable" />
        <PlaygroundCheckbox v-model="decorative" label="Decorative" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="alert-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
