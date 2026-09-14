<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui = {
  media: () => ({ class: 'bg-primary/10 text-primary ring-1 ring-primary/20' }),
  content: () => ({ class: 'px-2' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'text-primary/70' }),
  actions: () => ({ class: 'rounded-md bg-primary/5' }),
}

const code = `<script setup lang="ts">
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const ui = {
  media: () => ({ class: 'bg-primary/10 text-primary ring-1 ring-primary/20' }),
  content: () => ({ class: 'px-2' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'text-primary/70' }),
  actions: () => ({ class: 'rounded-md bg-primary/5' }),
}
${scriptEnd}

<template>
  <Attachment
    label="diseño.fig"
    description="4.1 MB · Figma"
    :icon="{ name: 'file', 'aria-hidden': true }"
    :ui="ui"
    class="w-full max-w-md"
  >
    <template #actions>
      <button type="button" aria-label="Abrir diseño.fig" class="px-2 py-1 text-xs font-medium">
        Abrir
      </button>
    </template>
  </Attachment>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Aplica estilos propios a media, content, label, description y actions."
    :code="code"
    :show-reset="false"
  >
    <Attachment
      label="diseño.fig"
      description="4.1 MB · Figma"
      :icon="{ name: 'file', 'aria-hidden': true }"
      :ui="ui"
      class="w-full max-w-md"
    >
      <template #actions>
        <button type="button" aria-label="Abrir diseño.fig" class="px-2 py-1 text-xs font-medium">
          Abrir
        </button>
      </template>
    </Attachment>
  </ComponentExample>
</template>
