<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const type = ref<'single' | 'multiple'>('single')
const collapsible = ref(true)
const disabled = ref(false)
const unmountOnHide = ref(true)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales y preferencias.',
    icon: { name: 'user' },
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Configura la contraseña y la autenticación.',
    icon: { name: 'warning' },
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Elige qué avisos quieres recibir.',
    icon: { name: 'info' },
  },
]
<\/script>

<template>
  <Accordion
    type="${type.value}"
    :collapsible="${collapsible.value}"
    :disabled="${disabled.value}"
    :unmount-on-hide="${unmountOnHide.value}"
    :items="items"
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
      defineComponent({ components: { Accordion }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([type, collapsible, disabled, unmountOnHide], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Accordion playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundSelect v-model="type" label="Type" :options="['single', 'multiple']" />
        <PlaygroundCheckbox v-model="collapsible" label="Collapsible" />
        <PlaygroundCheckbox v-model="disabled" label="Disabled" />
        <PlaygroundCheckbox v-model="unmountOnHide" label="Unmount on hide" />
      </div>
    </template>
    <div class="accordion-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
