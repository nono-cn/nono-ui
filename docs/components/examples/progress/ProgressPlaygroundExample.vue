<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Progress } from '@/components/ui/Progress'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const value = ref('65')
const max = ref('100')
const indeterminate = ref(false)
const label = ref('Progreso')
const size = ref<'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')
const severity = ref<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary')
const orientation = ref<'horizontal' | 'vertical'>('horizontal')
const inverted = ref(false)
const color = ref('#6366f1')
const trackColor = ref('#c7d2fe')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const valueProp = indeterminate.value ? 'null' : String(Number(value.value) || 0)
  const colorProps = useCustomColor.value
    ? ` color="${color.value}" track-color="${trackColor.value}"`
    : ''

  return `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
<\/script>

<template>
  <Progress
    :value="${valueProp}"
    :max="${Number(max.value) || 100}"
    label="${label.value}"
    size="${size.value}"
    severity="${severity.value}"
    orientation="${orientation.value}"
    :inverted="${inverted.value}"${colorProps}
    class="progress-playground-control"
    aria-label="${label.value}"
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
      defineComponent({ components: { Progress }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [
    value,
    max,
    indeterminate,
    label,
    size,
    severity,
    orientation,
    inverted,
    color,
    trackColor,
    useCustomColor,
  ],
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
    title="Progress playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="value" label="Value" />
        <PlaygroundTextInput v-model="max" label="Max" />
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundSelect
          v-model="size"
          label="Size"
          :options="['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']"
        />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'success', 'warning', 'error']"
        />
        <PlaygroundSelect
          v-model="orientation"
          label="Orientation"
          :options="['horizontal', 'vertical']"
        />
        <PlaygroundCheckbox v-model="indeterminate" label="Indeterminate" />
        <PlaygroundCheckbox v-model="inverted" label="Inverted" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
        <PlaygroundColorPicker v-model="trackColor" label="Track color" />
      </div>
    </template>
    <div class="progress-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
