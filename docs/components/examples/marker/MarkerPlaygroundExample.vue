<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Marker } from '@/components/ui/Marker'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const label = ref('Sincronización completada')
const variant = ref<'default' | 'border' | 'separator'>('default')
const icon = ref('success')
const status = ref(false)
const shimmer = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const iconProp = icon.value === 'none' ? '' : ` :icon="{ name: '${icon.value}' }"`

  return `<script setup lang="ts">
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'
<\/script>

<template>
  <Marker
    label="${label.value}"
    variant="${variant.value}"${iconProp}
    :status="${status.value}"
    :shimmer="${shimmer.value}"
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
      defineComponent({ components: { Marker }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, variant, icon, status, shimmer], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Marker playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundSelect
          v-model="variant"
          label="Variant"
          :options="['default', 'border', 'separator']"
        />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['none', 'success', 'info', 'warning', 'error', 'check']"
        />
        <PlaygroundCheckbox v-model="status" label="Status" />
        <PlaygroundCheckbox v-model="shimmer" label="Shimmer" />
      </div>
    </template>
    <div class="marker-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
