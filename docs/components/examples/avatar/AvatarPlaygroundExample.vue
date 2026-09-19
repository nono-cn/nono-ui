<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg'>('md')
const shape = ref<'rounded' | 'square'>('rounded')
const src = ref('https://i.pravatar.cc/150?img=3')
const delay = ref('1')
const label = ref('NC')
const icon = ref('none')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const iconProp = icon.value === 'none' ? '' : ` :icon="{ name: '${icon.value}' }"`

  return `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
<\/script>

<template>
  <Avatar
    src="${src.value}"
    :delay-ms="${Number(delay.value) || 0}"
    size="${size.value}"
    shape="${shape.value}"
    label="${label.value}"${iconProp}
    alt="Avatar de ejemplo"
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
      defineComponent({ components: { Avatar }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([size, shape, src, delay, label, icon], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Avatar playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="size" label="Size" :options="['xs', 'sm', 'md', 'lg']" />
        <PlaygroundSelect v-model="shape" label="Shape" :options="['rounded', 'square']" />
        <PlaygroundTextInput v-model="src" label="Src" />
        <PlaygroundTextInput v-model="delay" label="Delay (ms)" />
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['none', 'user', 'success', 'info']"
        />
      </div>
    </template>
    <div class="avatar-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
