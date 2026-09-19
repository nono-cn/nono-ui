<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { AspectRatio } from '@/components/ui/AspectRatio'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'

const ratio = ref('1.7778')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'
<\/script>

<template>
  <AspectRatio :ratio="${Number(ratio.value) || 1}" class="aspect-ratio-playground-control">
    <div class="aspect-ratio-playground-content">Contenido adaptable</div>
  </AspectRatio>
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
      defineComponent({ components: { AspectRatio }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(ratio, () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="AspectRatio playground"
    description="Configura la proporción y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="ratio"
          label="Ratio"
          :options="['1', '1.3333', '1.5', '1.7778', '2.35']"
        />
      </div>
    </template>
    <div class="aspect-ratio-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
