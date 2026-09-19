<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const label = ref('Resumen de la cuenta')
const description = ref('Consulta la información más reciente de tu cuenta.')
const showAction = ref(true)
const showFooter = ref(true)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const action = showAction.value
    ? '\n    <template #action><Button label="Editar" variant="outline" size="sm" /></template>'
    : ''
  const footer = showFooter.value
    ? '\n    <template #footer><span>Actualizado ahora</span></template>'
    : ''

  return `<script setup lang="ts">
import { Card } from '@nono-cn/nono-ui/components/ui/Card'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Card label="${label.value}" description="${description.value}">
    <p>Contenido principal de la card.</p>${action}${footer}
  </Card>
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
    const script = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const names = [...setupCode.matchAll(/(?:const|let)\s+(\w+)\s*=/g)].map((match) => match[1])
    const setup = new Function(
      'Vue',
      `const { ref, reactive, computed, watch } = Vue\n${setupCode}\nreturn { ${names.join(', ')} }`,
    )(Vue)
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Card, Button }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, description, showAction, showFooter], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Card playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundCheckbox v-model="showAction" label="Action" />
        <PlaygroundCheckbox v-model="showFooter" label="Footer" />
      </div>
    </template>
    <div class="card-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
