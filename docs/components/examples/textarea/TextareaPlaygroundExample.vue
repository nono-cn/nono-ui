<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const severity = ref<'primary' | 'secondary' | 'error' | 'warning' | 'success'>('primary')
const variant = ref<'outline' | 'subtle' | 'soft' | 'plain' | 'none'>('outline')
const autoresize = ref(false)
const highlight = ref(false)
const color = ref('#6366f1')
const useCustomColor = ref(false)
const value = ref('')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'
const value = ref('${value.value}')
<\/script>

<template>
  <Textarea v-model:value="value" size="${size.value}" severity="${severity.value}" variant="${variant.value}" :autoresize="${autoresize.value}" :highlight="${highlight.value}"${useCustomColor.value ? ` color="${color.value}"` : ''} />
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
      defineComponent({ components: { Textarea }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([size, severity, variant, autoresize, highlight, color, useCustomColor, value], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Textarea playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="size" label="Tamaño" :options="['xs', 'sm', 'md', 'lg', 'xl']" />
        <PlaygroundTextInput v-model="value" label="Value" />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'error', 'warning', 'success']"
        />
        <PlaygroundSelect
          v-model="variant"
          label="Variant"
          :options="['outline', 'subtle', 'soft', 'plain', 'none']"
        />
        <PlaygroundCheckbox v-model="autoresize" label="Autoresize" />
        <PlaygroundCheckbox v-model="highlight" label="Highlight" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <component :is="runtimeComponent" v-if="runtimeComponent" />
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
