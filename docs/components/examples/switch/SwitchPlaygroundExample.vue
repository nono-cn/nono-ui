<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Switch } from '@/components/ui/Switch'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const enabled = ref(false)
const disabled = ref(false)
const checkedIcon = ref('check')
const uncheckedIcon = ref('x')
const color = ref('#6366f1')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const checkedIconProp =
    checkedIcon.value === 'none' ? '' : ` :checked-icon="{ name: '${checkedIcon.value}' }"`
  const uncheckedIconProp =
    uncheckedIcon.value === 'none' ? '' : ` :unchecked-icon="{ name: '${uncheckedIcon.value}' }"`

  return `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'
const enabled = ref(${enabled.value})
<\/script>

<template>
  <Switch v-model:value="enabled" size="${size.value}" severity="${severity.value}"${useCustomColor.value ? ` color="${color.value}"` : ''}${disabled.value ? ' disabled' : ''}${checkedIconProp}${uncheckedIconProp} class="switch-playground-control" aria-label="Activar opción" />
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
      defineComponent({ components: { Switch }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [size, severity, enabled, disabled, checkedIcon, uncheckedIcon, color, useCustomColor],
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
    title="Switch playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="size" label="Tamaño" :options="['xs', 'sm', 'md', 'lg', 'xl']" />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundSelect
          v-model="checkedIcon"
          label="Icono checked"
          :options="['none', 'check', 'success', 'plus']"
        />
        <PlaygroundSelect
          v-model="uncheckedIcon"
          label="Icono unchecked"
          :options="['none', 'x', 'error', 'minus']"
        />
        <PlaygroundCheckbox v-model="enabled" label="Activado" />
        <PlaygroundCheckbox v-model="disabled" label="Disabled" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="switch-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
