<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Slider } from '@/components/ui/Slider'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const value = ref([35])
const range = ref(false)
const min = ref('0')
const max = ref('100')
const step = ref('1')
const orientation = ref<'horizontal' | 'vertical'>('horizontal')
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const severity = ref<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary')
const color = ref('')
const useCustomColor = ref(false)
const disabled = ref(false)
const inverted = ref(false)
const minStepsBetweenThumbs = ref('0')
const thumbAlignment = ref<'contain' | 'overflow'>('contain')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@nono-cn/nono-ui/components/ui/Slider'

const value = ref([${value.value.join(', ')}])
<\/script>

<template>
  <Slider
    v-model:value="value"
    :min="${Number(min.value) || 0}"
    :max="${Number(max.value) || 100}"
    :step="${Number(step.value) || 1}"
    :min-steps-between-thumbs="${Number(minStepsBetweenThumbs.value) || 0}"
    thumb-alignment="${thumbAlignment.value}"
    orientation="${orientation.value}"
    size="${size.value}"
    severity="${severity.value}"
    ${useCustomColor.value ? `color="${color.value}"` : ''}
    :inverted="${inverted.value}"
    :disabled="${disabled.value}"
    aria-label="Nivel"
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
      defineComponent({ components: { Slider }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [value, range, min, max, step, orientation, size, severity, color, useCustomColor, disabled, inverted, minStepsBetweenThumbs, thumbAlignment],
  () => {
  code.value = makeCode()
  runCode(code.value)
  },
)
watch(range, (enabled) => {
  value.value = enabled ? [25, 75] : [value.value[0] ?? 35]
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Slider playground"
    description="Configura el valor, la orientación y el estado del slider."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundCheckbox v-model="range" label="Range (2 thumbs)" />
        <PlaygroundTextInput v-model="min" label="Min" />
        <PlaygroundTextInput v-model="max" label="Max" />
        <PlaygroundTextInput v-model="step" label="Step" />
        <PlaygroundTextInput v-model="minStepsBetweenThumbs" label="Min gap" />
        <PlaygroundSelect
          v-model="orientation"
          label="Orientation"
          :options="['horizontal', 'vertical']"
        />
        <PlaygroundSelect
          v-model="size"
          label="Size"
          :options="['xs', 'sm', 'md', 'lg', 'xl']"
        />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'success', 'warning', 'error']"
        />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
        <PlaygroundSelect
          v-model="thumbAlignment"
          label="Thumb alignment"
          :options="['contain', 'overflow']"
        />
        <PlaygroundCheckbox v-model="disabled" label="Disabled" />
        <PlaygroundCheckbox v-model="inverted" label="Inverted" />
      </div>
    </template>
    <div class="slider-playground-stage" :class="`is-${orientation}`">
      <Slider
        v-model:value="value"
        :min-steps-between-thumbs="Number(minStepsBetweenThumbs) || 0"
        :thumb-alignment="thumbAlignment"
        :min="Number(min) || 0"
        :max="Number(max) || 100"
        :step="Number(step) || 1"
        :orientation="orientation"
        :size="size"
        :severity="severity"
        v-bind="useCustomColor ? { color } : {}"
        :disabled="disabled"
        :inverted="inverted"
        aria-label="Nivel"
      />
    </div>
    <p class="text-center text-sm text-muted-foreground">Valor: {{ value?.join(' – ') ?? '—' }}</p>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
