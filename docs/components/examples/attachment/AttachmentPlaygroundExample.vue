<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import * as Vue from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import PlaygroundExample from '../PlaygroundExample.vue'
import PlaygroundSelect from '../../playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from '../../playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from '../../playground/controls/PlaygroundCheckbox.vue'

const label = ref('documento.pdf')
const description = ref('2,4 MB · PDF')
const orientation = ref<'horizontal' | 'vertical'>('horizontal')
const size = ref<'md' | 'sm' | 'xs'>('md')
const state = ref<'idle' | 'uploading' | 'processing' | 'error' | 'done'>('idle')
const mediaVariant = ref<'icon' | 'image'>('icon')
const icon = ref('fileText')
const showActions = ref(false)
const code = ref('')
const runtimeComponent = shallowRef()
const runtimeError = ref('')

function makeCode() {
  const iconProp = mediaVariant.value === 'icon' ? ` :icon="{ name: '${icon.value}' }"` : ''
  const mediaSlot =
    mediaVariant.value === 'image'
      ? '\n    <template #media><img src="https://picsum.photos/200/120" alt="Vista previa del archivo" /></template>'
      : ''
  const actionsSlot = showActions.value
    ? '\n    <template #actions><Button label="Descargar" size="sm" variant="outline" /></template>'
    : ''
  const componentEnd =
    mediaVariant.value === 'image' || showActions.value
      ? `>${mediaSlot}${actionsSlot}\n  </Attachment>`
      : ' />'

  return `<script setup lang="ts">
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Attachment
    label="${label.value}"
    description="${description.value}"
    orientation="${orientation.value}"
    size="${size.value}"
    state="${state.value}"
    media-variant="${mediaVariant.value}"${iconProp}
    class="w-full attachment-playground-control"
  ${componentEnd}
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
      defineComponent({ components: { Attachment, Button }, setup: () => setup, render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
watch([label, description, orientation, size, state, mediaVariant, icon, showActions], () => {
  code.value = makeCode()
  runCode(code.value)
})
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Attachment playground"
    description="Configura las props y observa el resultado."
    :initial-code="initialCode"
    @run="runCode"
  >
    <template #controls>
      <div class="playground-prop-controls">
        <PlaygroundTextInput v-model="label" label="Label" />
        <PlaygroundTextInput v-model="description" label="Description" />
        <PlaygroundSelect
          v-model="orientation"
          label="Orientation"
          :options="['horizontal', 'vertical']"
        />
        <PlaygroundSelect v-model="size" label="Size" :options="['md', 'sm', 'xs']" />
        <PlaygroundSelect
          v-model="state"
          label="State"
          :options="['idle', 'uploading', 'processing', 'error', 'done']"
        />
        <PlaygroundSelect
          v-model="mediaVariant"
          label="Media variant"
          :options="['icon', 'image']"
        />
        <PlaygroundSelect
          v-model="icon"
          label="Icon"
          :options="['fileText', 'file', 'image', 'folder']"
        />
        <PlaygroundCheckbox v-model="showActions" label="Actions" />
      </div>
    </template>
    <div class="attachment-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
