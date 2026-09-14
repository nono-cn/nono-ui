<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import { computed, ref } from 'vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const mediaVariant = ref<'default' | 'icon'>('icon')
const code = computed(
  () => `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Empty
    label="Sin resultados"
    description="Prueba con otros términos de búsqueda."
    media-variant="${mediaVariant.value}"
  >
    <template #media>
      <Icon name="search" aria-hidden="true" />
    </template>
  </Empty>
</template>`,
)
function reset() {
  mediaVariant.value = 'icon'
}
</script>
<template>
  <ComponentExample
    title="Media variant"
    description="Presenta un icono en la zona media."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <select v-model="mediaVariant" class="h-9 rounded-md border bg-background px-3 text-sm">
        <option value="default">default</option>
        <option value="icon">icon</option>
      </select>
    </template>
    <Empty
      label="Sin resultados"
      description="Prueba con otros términos de búsqueda."
      :media-variant="mediaVariant"
    >
      <template #media>
        <Icon name="search" aria-hidden="true" />
      </template>
    </Empty>
  </ComponentExample>
</template>
