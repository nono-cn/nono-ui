<script setup lang="ts">
import { computed, ref } from 'vue'
import { Marker, type MarkerVariant } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: MarkerVariant = 'default'
const variant = ref<MarkerVariant>(initialVariant)
const variants: MarkerVariant[] = ['default', 'border', 'separator']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker, type MarkerVariant } from '@nono-cn/nono-ui/components/ui/Marker'

const variant = ref<MarkerVariant>('${variant.value}')
${scriptEnd}

<template>
  <Marker label="Sincronizado a las 10:42" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = initialVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Elige el tratamiento visual del indicador."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="marker-variant">
        variant
        <select
          id="marker-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in variants" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Marker label="Sincronizado a las 10:42" :variant="variant" class="max-w-md" />
  </ComponentExample>
</template>
