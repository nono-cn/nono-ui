<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const label = ref('Guardar cambios')
const size = ref<'xs' | 'sm' | 'md' | 'lg'>('md')
const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'>('solid')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const icon = ref('none')
const trailingIcon = ref('none')
const rounded = ref(false)
const square = ref(false)
const raised = ref(false)
const loading = ref(false)
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
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Button
    label="${label.value}"
    size="${size.value}"
    variant="${variant.value}"
    severity="${severity.value}"${iconProp}${trailingIconProp}
    :rounded="${rounded.value}"
    :square="${square.value}"
    :raised="${raised.value}"
    :loading="${loading.value}"${useCustomColor.value ? ` color="${color.value}"` : ''}
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
      defineComponent({ components: { Button }, setup: () => setup, render }),
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
    label,
    size,
    variant,
    severity,
    icon,
    trailingIcon,
    rounded,
    square,
    raised,
    loading,
    color,
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
    title="Button playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundSelect v-model="size" label="Size" :options="['xs', 'sm', 'md', 'lg']" />
        <PlaygroundSelect
          v-model="variant"
          label="Variant"
          :options="['solid', 'outline', 'plain', 'subtle', 'soft', 'link']"
        />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['none', 'check', 'save', 'plus', 'info']"
        />
        <PlaygroundSelect
          v-model="trailingIcon"
          label="Trailing icon"
          :options="['none', 'chevronRight', 'x', 'plus']"
        />
        <PlaygroundCheckbox v-model="rounded" label="Rounded" />
        <PlaygroundCheckbox v-model="square" label="Square" />
        <PlaygroundCheckbox v-model="raised" label="Raised" />
        <PlaygroundCheckbox v-model="loading" label="Loading" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="button-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
