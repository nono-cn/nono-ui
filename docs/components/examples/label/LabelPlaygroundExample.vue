<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, shallowRef } from 'vue'
import * as Vue from 'vue'
import { Label } from '@/components/ui/Label'
import PlaygroundExample from '../PlaygroundExample.vue'

const code = shallowRef('')
const runtimeComponent = shallowRef()
const runtimeError = shallowRef('')

function makeCode() {
  return `<script setup lang="ts">
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
<\/script>

<template>
  <div class="label-playground-content">
    <Label for="playground-input">Nombre del campo</Label>
    <input id="playground-input" type="text" placeholder="Escribe algo" />
  </div>
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
      defineComponent({ components: { Label }, setup: () => ({}), render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Label playground"
    description="Asocia una etiqueta visible con un control de formulario."
    :initial-code="initialCode"
    @run="runCode"
  >
    <div class="label-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
