<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { ScrollArea } from '@/components/ui/ScrollArea'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const type = ref<'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'>('hover')
const orientation = ref<'vertical' | 'horizontal' | 'both'>('vertical')
const scrollHideDelay = ref('600')
const forceMount = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const text =
    'Contenido desplazable con texto suficientemente largo para superar el tamaño del viewport y mostrar el comportamiento del scroll.'
  const content = Array.from({ length: 14 }, (_, index) => `    <p>${text} ${index + 1}</p>`).join(
    '\n',
  )

  return `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'
<\/script>

<template>
  <ScrollArea type="${type.value}" orientation="${orientation.value}" :scroll-hide-delay="${Number(scrollHideDelay.value) || 0}" :force-mount="${forceMount.value}" class="scroll-area-playground-control">
${content}
  </ScrollArea>
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
      defineComponent({ components: { ScrollArea }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([type, orientation, scrollHideDelay, forceMount], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="ScrollArea playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="type"
          label="Type"
          :options="['auto', 'always', 'scroll', 'hover', 'glimpse']"
        />
        <PlaygroundSelect
          v-model="orientation"
          label="Orientation"
          :options="['vertical', 'horizontal', 'both']"
        />
        <PlaygroundTextInput v-model="scrollHideDelay" label="Scroll hide delay" />
        <PlaygroundCheckbox v-model="forceMount" label="Force mount" />
      </div>
    </template>
    <div class="scroll-area-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
