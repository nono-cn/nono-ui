<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'
import PlaygroundColorPicker from '../../playground/controls/PlaygroundColorPicker.vue'

const align = ref<'start' | 'end'>('start')
const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'muted'>('solid')
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const sideReaction = ref<'top' | 'bottom'>('bottom')
const alignReaction = ref<'start' | 'end'>('end')
const showReactions = ref(true)
const color = ref('#6366f1')
const useCustomColor = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const reactions = showReactions.value
    ? `\n    <template #reactions><span>👍</span><span>❤️</span></template>`
    : ''

  return `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
<\/script>

<template>
  <Bubble
    align="${align.value}"
    variant="${variant.value}"
    severity="${severity.value}"
    side-reaction="${sideReaction.value}"
    align-reaction="${alignReaction.value}"${useCustomColor.value ? ` color="${color.value}"` : ''}
  >
    Mensaje de ejemplo en la conversación.${reactions}
  </Bubble>
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
      defineComponent({ components: { Bubble }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch(
  [align, variant, severity, sideReaction, alignReaction, showReactions, color, useCustomColor],
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
    title="Bubble playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="align" label="Align" :options="['start', 'end']" />
        <PlaygroundSelect
          v-model="variant"
          label="Variant"
          :options="['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']"
        />
        <PlaygroundSelect
          v-model="severity"
          label="Severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundSelect
          v-model="sideReaction"
          label="Reaction side"
          :options="['top', 'bottom']"
        />
        <PlaygroundSelect
          v-model="alignReaction"
          label="Reaction align"
          :options="['start', 'end']"
        />
        <PlaygroundCheckbox v-model="showReactions" label="Reactions" />
        <PlaygroundCheckbox v-model="useCustomColor" label="Color personalizado" />
        <PlaygroundColorPicker v-model="color" label="Color" />
      </div>
    </template>
    <div class="bubble-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
