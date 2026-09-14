<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: BadgeVariant = 'solid'
const variant = ref<BadgeVariant>(initialVariant)
const variants: BadgeVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']

const code = computed(
  () => `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'

const variant = '${variant.value}' as const
${scriptEnd}

<template>
  <Badge label="Status" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = initialVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Elige el tratamiento visual que mejor encaje con tu interfaz."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="badge-variant">
        variant
        <select
          id="badge-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="badgeVariant in variants" :key="badgeVariant" :value="badgeVariant">
            {{ badgeVariant }}
          </option>
        </select>
      </label>
    </template>
    <Badge label="Status" :variant="variant" />
  </ComponentExample>
</template>
