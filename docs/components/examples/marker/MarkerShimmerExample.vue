<script setup lang="ts">
import { computed, ref } from 'vue'
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialShimmer = true
const shimmer = ref(initialShimmer)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'

const shimmer = ref(${shimmer.value})
${scriptEnd}

<template>
  <Marker label="Cargando datos" :shimmer="shimmer" status />
</template>`,
)

function reset() {
  shimmer.value = initialShimmer
}
</script>

<template>
  <ComponentExample
    title="Shimmer"
    description="Activa o desactiva la animación de pulso del indicador."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="inline-flex items-center gap-2 text-xs font-medium" for="marker-shimmer">
        <input
          id="marker-shimmer"
          v-model="shimmer"
          type="checkbox"
          class="size-4 accent-primary"
        />
        shimmer
      </label>
    </template>
    <Marker label="Cargando datos" :shimmer="shimmer" status class="max-w-md" />
  </ComponentExample>
</template>
