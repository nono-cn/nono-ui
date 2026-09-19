<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const checked = ref(false)
const indeterminate = ref(false)
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const icon = ref('check')
const indeterminateIcon = ref('minus')
const color = ref('#6366f1')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const value = indeterminate.value ? "'indeterminate'" : String(checked.value)

  return `<script setup lang="ts">
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'
<\/script>

<template>
  <Checkbox
    :value="${value}"
    size="${size.value}"
    severity="${severity.value}"
    :icon="{ name: '${icon.value}' }"
    :indeterminate-icon="{ name: '${indeterminateIcon.value}' }"${useCustomColor.value ? ` color="${color.value}"` : ''}
    aria-label="Seleccionar opción"
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
      defineComponent({ components: { Checkbox }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [checked, indeterminate, size, severity, icon, indeterminateIcon, color, useCustomColor],
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
    title="Checkbox playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="size" label="Size" :options="['xs', 'sm', 'md', 'lg', 'xl']" />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['check', 'success', 'plus', 'x']"
        />
        <PlaygroundSelect
          v-model="indeterminateIcon"
          label="Indeterminate icon"
          :options="['minus', 'x', 'check']"
        />
        <PlaygroundCheckbox v-model="checked" label="Checked" />
        <PlaygroundCheckbox v-model="indeterminate" label="Indeterminate" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="checkbox-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
      <span>Seleccionar opción</span>
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
