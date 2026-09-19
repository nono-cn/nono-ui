<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Message } from '@/components/ui/Message'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const align = ref<'start' | 'end'>('start')
const message = ref('Este es un mensaje de ejemplo.')
const bubbleVariant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'muted'>('solid')
const bubbleSeverity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('primary')
const showAvatar = ref(true)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const avatar = showAvatar.value
    ? `\n    :avatar="{ src: 'https://i.pravatar.cc/100?img=3', label: 'NC' }"`
    : ''

  return `<script setup lang="ts">
import { Message } from '@nono-cn/nono-ui/components/ui/Message'
<\/script>

<template>
  <Message
    align="${align.value}"
    message="${message.value}"
    :bubble="{ variant: '${bubbleVariant.value}', severity: '${bubbleSeverity.value}' }"${avatar}
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
      defineComponent({ components: { Message }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([align, message, bubbleVariant, bubbleSeverity, showAvatar], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Message playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="align" label="Align" :options="['start', 'end']" />
        <PlaygroundTextInput v-model="message" label="Message" />
        <PlaygroundSelect
          v-model="bubbleVariant"
          label="Bubble variant"
          :options="['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']"
        />
        <PlaygroundSelect
          v-model="bubbleSeverity"
          label="Bubble severity"
          :options="['primary', 'secondary', 'warning', 'success', 'error']"
        />
        <PlaygroundCheckbox v-model="showAvatar" label="Avatar" />
      </div>
    </template>
    <div class="message-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
