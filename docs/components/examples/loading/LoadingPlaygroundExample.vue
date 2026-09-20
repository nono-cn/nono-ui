<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Loading } from '@/components/ui/Loading'
import PlaygroundExample from '../PlaygroundExample.vue'
import { scriptEnd } from '../example-code'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'

const loading = ref(true)
const icon = ref('spinner')
const customLoading = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const loadingSlot = customLoading.value
    ? `
    <template #loading>
      <span>Preparando usuarios...</span>
    </template>`
    : ''

  return `<script setup lang="ts">
import { Loading } from '@nono-cn/nono-ui/components/ui/Loading'
${scriptEnd}

<template>
  <Loading
    :loading="${loading.value}"
    :icon="{ name: '${icon.value}' }"
    aria-label="Cargando usuarios"
  >${loadingSlot}
    <ul>
      <li>Ana</li>
      <li>Bruno</li>
      <li>Carla</li>
    </ul>
  </Loading>
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*)<\/template>\s*$/)?.[1] ?? ''
    const script =
      source.match(new RegExp(`<script setup[^>]*>([\\s\\S]*?)${scriptEnd}`))?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const names = [...setupCode.matchAll(/(?:const|let)\s+(\w+)\s*=/g)].map((match) => match[1])
    const setup = new Function(
      'Vue',
      `const { ref, reactive, computed, watch } = Vue\n${setupCode}\nreturn { ${names.join(', ')} }`,
    )(Vue)
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Loading }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([loading, icon, customLoading], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Loading playground"
    description="Cambia el estado y el icono para observar ambos estados."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundCheckbox v-model="loading" label="Loading" />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['spinner', 'search', 'user', 'upload', 'check']"
        />
        <PlaygroundCheckbox v-model="customLoading" label="Custom loading slot" />
      </div>
    </template>
    <div class="loading-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
