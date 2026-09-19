<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Empty } from '@/components/ui/Empty'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'

const label = ref('No hay resultados')
const description = ref('Prueba a cambiar los filtros para encontrar contenido.')
const mediaVariant = ref<'default' | 'icon'>('icon')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
<\/script>

<template>
  <Empty
    label="${label.value}"
    description="${description.value}"
    media-variant="${mediaVariant.value}"
  >
    <template #media>∅</template>
    <button type="button">Volver a intentar</button>
  </Empty>
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
    const script = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
    const setupCode = script.replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    const names = [...setupCode.matchAll(/(?:const|let)\s+(\w+)\s*=/g)].map((match) => match[1])
    const setup = new Function(
      'Vue',
      `const { ref, reactive, computed, watch } = Vue\n${setupCode}\nreturn { ${names.join(', ')} }`,
    )(Vue)
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Empty }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, description, mediaVariant], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Empty playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundSelect
          v-model="mediaVariant"
          label="Media variant"
          :options="['default', 'icon']"
        />
      </div>
    </template>
    <div class="empty-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
