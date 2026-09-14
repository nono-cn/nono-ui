<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'
${scriptEnd}

<template>
  <Attachment
    label="documento.pdf"
    description="2.4 MB · PDF"
    :icon="{ name: 'file', 'aria-hidden': true }"
    class="w-full max-w-md"
  >
    <template #actions>
      <button
        type="button"
        aria-label="Descargar documento.pdf"
        class="rounded-md px-2 py-1 text-xs font-medium hover:bg-muted"
      >
        Descargar
      </button>
    </template>
  </Attachment>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Representa un archivo con su icono, información y una acción."
    :code="code"
    :show-reset="false"
  >
    <Attachment
      label="documento.pdf"
      description="2.4 MB · PDF"
      :icon="{ name: 'file', 'aria-hidden': true }"
      class="w-full max-w-md"
    >
      <template #actions>
        <button
          type="button"
          aria-label="Descargar documento.pdf"
          class="rounded-md px-2 py-1 text-xs font-medium hover:bg-muted"
        >
          Descargar
        </button>
      </template>
    </Attachment>
  </ComponentExample>
</template>
