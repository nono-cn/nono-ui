<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Chip } from '@/components/ui/Chip'
import { Avatar } from '@/components/ui/Avatar'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const size = ref('3xl')
const position = ref<'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'>('top-right')
const show = ref(true)
const inset = ref(false)
const standalone = ref(true)
const color = ref('#ef4444')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
<\/script>

<template>
  <Chip
    size="${size.value}"
    position="${position.value}"
    :show="${show.value}"
    :inset="${inset.value}"
    :standalone="${standalone.value}"${useCustomColor.value ? ` color="${color.value}"` : ''}
    class="chip-playground-control"
  >
    <Avatar src="https://i.pravatar.cc/100?img=3" size="lg" label="NC" />
  </Chip>
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
      defineComponent({ components: { Chip, Avatar }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([size, position, show, inset, standalone, color, useCustomColor], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Chip playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="size"
          label="Size"
          :options="['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']"
        />
        <PlaygroundSelect
          v-model="position"
          label="Position"
          :options="['top-right', 'bottom-right', 'top-left', 'bottom-left']"
        />
        <PlaygroundCheckbox v-model="show" label="Show" />
        <PlaygroundCheckbox v-model="inset" label="Inset" />
        <PlaygroundCheckbox v-model="standalone" label="Standalone" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="chip-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
