<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const side = ref<'top' | 'right' | 'bottom' | 'left'>('bottom')
const align = ref<'start' | 'center' | 'end'>('center')
const sideOffset = ref('4')
const alignOffset = ref('0')
const modal = ref(false)
const showArrow = ref(true)
const sideFlip = ref(true)
const alignFlip = ref(true)
const avoidCollisions = ref(true)
const forceMount = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Popover
    side="${side.value}"
    align="${align.value}"
    :side-offset="${Number(sideOffset.value) || 0}"
    :align-offset="${Number(alignOffset.value) || 0}"
    :modal="${modal.value}"
    :show-arrow="${showArrow.value}"
    :side-flip="${sideFlip.value}"
    :align-flip="${alignFlip.value}"
    :avoid-collisions="${avoidCollisions.value}"
    :force-mount="${forceMount.value}"
  >
    <Button label="Abrir popover" />
    <template #content="{ close }">
      <p>Contenido contextual del popover.</p>
      <Button label="Cerrar" @click="close" />
    </template>
  </Popover>
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
      defineComponent({ components: { Popover, Button }, setup: () => setup, render }),
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
    side,
    align,
    sideOffset,
    alignOffset,
    modal,
    showArrow,
    sideFlip,
    alignFlip,
    avoidCollisions,
    forceMount,
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
    title="Popover playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect
          v-model="side"
          label="Side"
          :options="['top', 'right', 'bottom', 'left']"
        />
        <PlaygroundSelect v-model="align" label="Align" :options="['start', 'center', 'end']" />
        <PlaygroundTextInput v-model="sideOffset" label="Side offset" />
        <PlaygroundTextInput v-model="alignOffset" label="Align offset" />
        <PlaygroundCheckbox v-model="modal" label="Modal" />
        <PlaygroundCheckbox v-model="showArrow" label="Show arrow" />
        <PlaygroundCheckbox v-model="sideFlip" label="Side flip" />
        <PlaygroundCheckbox v-model="alignFlip" label="Align flip" />
        <PlaygroundCheckbox v-model="avoidCollisions" label="Avoid collisions" />
        <PlaygroundCheckbox v-model="forceMount" label="Force mount" />
      </div>
    </template>
    <div class="popover-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
