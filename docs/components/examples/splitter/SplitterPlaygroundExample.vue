<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Splitter } from '@/components/ui/Splitter'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const direction = ref<'horizontal' | 'vertical'>('horizontal')
const disabled = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

const items = [
  { id: 'navigation', slot: 'navigation', defaultSize: 28, minSize: 18 },
  { id: 'content', slot: 'content', defaultSize: 72, minSize: 35 },
]

function makeCode() {
  const tag = (value: string) => String.fromCharCode(60) + value

  return `${tag('script setup lang="ts">')}
import { Splitter } from '@nono-cn/nono-ui/components/ui/Splitter'

const items = ${JSON.stringify(items, null, 2)}
${tag('/script>')}

${tag('template>')}
  ${tag(`Splitter direction="${direction.value}" :disabled="${disabled.value}" :items="items" class="min-h-96 rounded-md border" :ui="{ panel: () => ({ class: 'flex items-center justify-center' }) }">`)}
    ${tag('template #panel-navigation>')}Navigation${tag('/template>')}
    ${tag('template #panel-content>')}Main content${tag('/template>')}
  ${tag('/Splitter>')}
${tag('/template>')}`
}

const initialCode = makeCode()
code.value = initialCode

watch([direction, disabled], () => {
  code.value = makeCode()
  runCode(code.value)
})

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*)<\/template>\s*$/)?.[1] ?? ''
    const script = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const names = [...setupCode.matchAll(/(?:const|let)\s+(\w+)\s*=/g)].map((match) => match[1])
    const setup = new Function(
      'Vue',
      `const { ref, reactive, computed, watch } = Vue\n${setupCode}\nreturn { ${names.join(', ')} }`,
    )(Vue)
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Splitter }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

function reset() {
  code.value = makeCode()
  runCode(code.value)
}

runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Splitter playground"
    description="Prueba la orientación y el estado de los manejadores. Arrastra el separador entre los paneles."
    :initial-code="initialCode"
    @reset="reset"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="direction"
          label="Direction"
          :options="['horizontal', 'vertical']"
        />
        <PlaygroundCheckbox v-model="disabled" label="Disabled" />
      </div>
    </template>
    <div class="splitter-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>

<style scoped>
.splitter-playground-panel {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
}
</style>
