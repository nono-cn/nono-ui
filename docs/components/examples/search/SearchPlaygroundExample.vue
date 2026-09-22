<script setup lang="ts">
import { compile } from '@vue/compiler-dom'
import { defineComponent, markRaw, shallowRef } from 'vue'
import * as Vue from 'vue'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search } from '@/components/ui/Search'
import PlaygroundExample from '../PlaygroundExample.vue'

const code = shallowRef('')
const runtimeComponent = shallowRef()
const runtimeError = shallowRef('')

function makeCode() {
  return `<script setup lang="ts">
import { Search } from '__DOCS_PACKAGE__/components/ui/Search'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
<\/script>

<template>
  <Search class="flex items-end gap-4" aria-label="Buscar en el sitio" @submit.prevent>
    <label class="flex min-w-0 flex-1 flex-col gap-2" for="site-search">
      Buscar
      <Input id="site-search" type="search" name="q" placeholder="Escribe una búsqueda" />
    </label>
    <Button type="submit">Buscar</Button>
  </Search>
</template>`
}

function runCode(source: string) {
  try {
    const template = source.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? ''
    const render = new Function('Vue', `${compile(template, { mode: 'function' }).code}`)(Vue)
    runtimeComponent.value = markRaw(
      defineComponent({ components: { Button, Input, Search }, setup: () => ({}), render }),
    )
    runtimeError.value = ''
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : 'No se pudo ejecutar el código.'
  }
}

const initialCode = makeCode()
code.value = initialCode
runCode(initialCode)
</script>

<template>
  <PlaygroundExample
    v-model:code="code"
    title="Search playground"
    description="Agrupa los controles de una búsqueda en un formulario semántico."
    :initial-code="initialCode"
    @run="runCode"
  >
    <div class="search-playground-stage">
      <component :is="runtimeComponent" v-if="runtimeComponent" />
    </div>
    <p v-if="runtimeError" class="playground-runtime-error">{{ runtimeError }}</p>
  </PlaygroundExample>
</template>
