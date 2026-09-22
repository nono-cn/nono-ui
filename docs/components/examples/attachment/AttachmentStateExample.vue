<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'

const states = [
  { value: 'idle', label: 'Pendiente', description: 'Listo para comenzar' },
  { value: 'uploading', label: 'Subiendo', description: 'Procesando archivo' },
  { value: 'processing', label: 'Procesando', description: 'Preparando archivo' },
  { value: 'error', label: 'Error', description: 'No se pudo procesar' },
  { value: 'done', label: 'Completado', description: 'Archivo listo' },
] as const

const code = `<script setup lang="ts">
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const states = ['idle', 'uploading', 'processing', 'error', 'done'] as const
<\/script>

<template>
  <div class="grid gap-3">
    <Attachment v-for="state in states" :key="state" :state="state" :label="state" description="Estado del archivo" :icon="{ name: 'file' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Estados"
    description="Cada state cambia la presentación del archivo."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <Attachment
        v-for="state in states"
        :key="state.value"
        :state="state.value"
        :label="state.label"
        :description="state.description"
        :icon="{ name: 'file' }"
      />
    </div>
  </ComponentExample>
</template>
