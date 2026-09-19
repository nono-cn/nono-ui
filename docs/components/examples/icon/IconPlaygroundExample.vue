<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Icon } from '@/components/ui/Icon'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const name = ref('check')
const size = ref<'xs' | 'sm' | 'md' | 'lg'>('lg')
const color = ref('#6366f1')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
<\/script>

<template>
  <Icon name="${name.value}" size="${size.value}" color="${color.value}" aria-label="Icono de ejemplo" />
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
      defineComponent({ components: { Icon }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([name, size, color], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Icon playground"
    description="Configura el nombre, el tamaño y el color del icono."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="name"
          label="Name"
          :options="['check', 'success', 'warning', 'error', 'info', 'search', 'save', 'x', 'plus']"
        />
        <PlaygroundSelect v-model="size" label="Size" :options="['xs', 'sm', 'md', 'lg']" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="icon-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
