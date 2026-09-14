<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button variant="soft">
      <template #leading>
        <Icon name="save" size="sm" />
      </template>
      Guardar
      <template #trailing>
        <Icon name="chevronRight" size="sm" />
      </template>
    </Button>
    <Button :loading="true" variant="outline">
      <template #loading>Guardando</template>
      Guardar
    </Button>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Personaliza el contenido principal, los iconos y el estado de carga con los slots disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button variant="soft">
        <template #leading>
          <Icon name="save" size="sm" />
        </template>
        Guardar
        <template #trailing>
          <Icon name="chevronRight" size="sm" />
        </template>
      </Button>
      <Button :loading="true" variant="outline">
        <template #loading>Guardando</template>
        Guardar
      </Button>
    </div>
  </ComponentExample>
</template>
