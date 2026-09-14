<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'
${scriptEnd}

<template>
  <Attachment media-variant="image" class="w-full max-w-md">
    <template #media>
      <div
        role="img"
        aria-label="Miniatura del archivo"
        class="grid size-full place-items-center bg-warning/10 text-warning"
      >
        <Icon name="image" aria-hidden="true" />
      </div>
    </template>
    <template #label>captura.png</template>
    <template #description>1.8 MB · PNG</template>
    <template #actions>
      <button type="button" aria-label="Eliminar captura.png" class="px-2 py-1 text-xs">
        Eliminar
      </button>
    </template>
  </Attachment>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Personaliza la media, la información y las acciones con los slots disponibles."
    :code="code"
    :show-reset="false"
  >
    <Attachment media-variant="image" class="w-full max-w-md">
      <template #media>
        <div
          role="img"
          aria-label="Miniatura del archivo"
          class="grid size-full place-items-center bg-warning/10 text-warning"
        >
          <Icon name="image" aria-hidden="true" />
        </div>
      </template>
      <template #label>captura.png</template>
      <template #description>1.8 MB · PNG</template>
      <template #actions>
        <button type="button" aria-label="Eliminar captura.png" class="px-2 py-1 text-xs">
          Eliminar
        </button>
      </template>
    </Attachment>
  </ComponentExample>
</template>
