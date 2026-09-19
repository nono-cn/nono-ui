<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Badge } from '@/components/ui/Badge'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const label = ref('Estado activo')
const size = ref<'sm' | 'md' | 'lg'>('md')
const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft'>('solid')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const icon = ref('none')
const trailingIcon = ref('none')
const color = ref('#6366f1')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const iconProp = icon.value === 'none' ? '' : ` :icon="{ name: '${icon.value}' }"`
  const trailingIconProp =
    trailingIcon.value === 'none' ? '' : ` :trailing-icon="{ name: '${trailingIcon.value}' }"`

  return `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
<\/script>

<template>
  <Badge
    label="${label.value}"
    size="${size.value}"
    variant="${variant.value}"
    severity="${severity.value}"${iconProp}${trailingIconProp}${useCustomColor.value ? ` color="${color.value}"` : ''}
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
      defineComponent({ components: { Badge }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, size, variant, severity, icon, trailingIcon, color, useCustomColor], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Badge playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundSelect v-model="size" label="Size" :options="['sm', 'md', 'lg']" />
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
          :options="['none', 'check', 'success', 'info', 'warning']"
        />
        <PlaygroundSelect
          v-model="trailingIcon"
          label="Trailing icon"
          :options="['none', 'chevronRight', 'x', 'plus']"
        />
        <label class="playground-control-checkbox">
          <input v-model="useCustomColor" type="checkbox" />
          <span>Color personalizado</span>
        </label>
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="badge-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
