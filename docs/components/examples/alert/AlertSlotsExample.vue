<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
${scriptEnd}

<template>
  <Alert variant="soft" severity="success" closable>
    <template #icon>
      <Icon name="success" aria-hidden="true" />
    </template>
    <template #label>Guardado</template>
    <template #description>Los cambios se han guardado correctamente.</template>
    <template #close="{ close }">
      <button type="button" aria-label="Cerrar" @click="close">×</button>
    </template>
  </Alert>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Sustituye las partes internas de Alert y usa la función close del slot de cierre."
    :code="code"
    :show-reset="false"
  >
    <Alert variant="soft" severity="success" closable>
      <template #icon>
        <Icon name="success" aria-hidden="true" />
      </template>
      <template #label>Guardado</template>
      <template #description>Los cambios se han guardado correctamente.</template>
      <template #close="{ close }">
        <button
          type="button"
          aria-label="Cerrar"
          class="rounded px-1 text-lg leading-none hover:bg-black/10"
          @click="close"
        >
          ×
        </button>
      </template>
    </Alert>
  </ComponentExample>
</template>
