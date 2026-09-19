<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const label = ref('¿Eliminar este elemento?')
const description = ref('Esta acción no se puede deshacer.')
const icon = ref('warning')
const unmountOnHide = ref(true)
const forceMount = ref(false)
const disableOutsidePointerEvents = ref(true)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  return `<script setup lang="ts">
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <AlertDialog
    label="${label.value}"
    description="${description.value}"
    :icon="{ name: '${icon.value}' }"
    :unmount-on-hide="${unmountOnHide.value}"
    :force-mount="${forceMount.value}"
    :disable-outside-pointer-events="${disableOutsidePointerEvents.value}"
  >
    <Button label="Eliminar" severity="error" />
  </AlertDialog>
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
      defineComponent({ components: { AlertDialog, Button }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, description, icon, unmountOnHide, forceMount, disableOutsidePointerEvents], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="AlertDialog playground"
    description="Configura las props y abre el diálogo para comprobar el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['warning', 'error', 'info', 'success']"
        />
        <PlaygroundCheckbox v-model="unmountOnHide" label="Unmount on hide" />
        <PlaygroundCheckbox v-model="forceMount" label="Force mount" />
        <PlaygroundCheckbox
          v-model="disableOutsidePointerEvents"
          label="Disable outside pointer events"
        />
      </div>
    </template>
    <div class="alert-dialog-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
