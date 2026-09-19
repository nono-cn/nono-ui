<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'

const orientation = ref<'horizontal' | 'vertical'>('horizontal')
const size = ref<'xs' | 'sm' | 'md' | 'lg'>('md')
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { ButtonGroup } from '@nono-cn/nono-ui/components/ui/ButtonGroup'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <ButtonGroup orientation="${orientation.value}" size="${size.value}">
    <Button label="Anterior" variant="outline" />
    <Button label="Guardar" />
    <Button label="Siguiente" variant="outline" />
  </ButtonGroup>
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
      defineComponent({ components: { ButtonGroup, Button }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([orientation, size], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="ButtonGroup playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="orientation"
          label="Orientation"
          :options="['horizontal', 'vertical']"
        />
        <PlaygroundSelect v-model="size" label="Size" :options="['xs', 'sm', 'md', 'lg']" />
      </div>
    </template>
    <div class="button-group-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
