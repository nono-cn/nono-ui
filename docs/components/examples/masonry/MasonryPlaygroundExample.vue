<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Masonry } from '@/components/ui/Masonry'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const columns = ref('3')
const spacing = ref('4')
const sequential = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const columnsProp = columns.value === 'responsive' ? '{ sm: 1, md: 2, lg: 4 }' : columns.value

  return `<script setup lang="ts">
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
<\/script>

<template>
  <Masonry
    :items="[1, 2, 3, 4, 5, 6, 7, 8]"
    :columns="${columnsProp}"
    :spacing="${Number(spacing.value) || 0}"
    :sequential="${sequential.value}"
    class="masonry-playground-control"
  >
    <template #default="{ index }">
      <div class="masonry-playground-item" :style="{ minHeight: \`\${40 + (index % 4) * 24}px\` }">Item {{ index + 1 }}</div>
    </template>
  </Masonry>
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
      defineComponent({ components: { Masonry }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([columns, spacing, sequential], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Masonry playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="columns"
          label="Columns"
          :options="['1', '2', '3', '4', 'responsive']"
        />
        <PlaygroundTextInput v-model="spacing" label="Spacing" />
        <PlaygroundCheckbox v-model="sequential" label="Sequential" />
      </div>
    </template>
    <div class="masonry-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
