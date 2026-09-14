<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid gap-4">
    <div class="grid gap-2">
      <span class="text-xs font-medium text-muted-foreground">role="alert" · se anuncia</span>
      <Alert
        label="Sincronización completada"
        description="El contenido se anuncia como una alerta."
        :icon="{ name: 'success', 'aria-hidden': 'true' }"
      />
    </div>
    <div class="grid gap-2">
      <span class="text-xs font-medium text-muted-foreground">role="none" · no se anuncia</span>
      <Alert
        label="Separador visual"
        description="Este mensaje no se anuncia a lectores de pantalla."
        decorative
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Alertas informativas y decorativas"
    description="Elige la semántica según si el mensaje necesita anunciarse o solo aporta contexto visual."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <div class="grid gap-2">
        <span class="text-xs font-medium text-muted-foreground">role="alert" · se anuncia</span>
        <Alert
          label="Sincronización completada"
          description="El contenido se anuncia como una alerta."
          :icon="{ name: 'success', 'aria-hidden': 'true' }"
        />
      </div>
      <div class="grid gap-2">
        <span class="text-xs font-medium text-muted-foreground">role="none" · no se anuncia</span>
        <Alert
          label="Separador visual"
          description="Este mensaje no se anuncia a lectores de pantalla."
          decorative
        />
      </div>
    </div>
  </ComponentExample>
</template>
