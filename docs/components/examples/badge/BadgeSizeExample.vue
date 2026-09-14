<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeSize } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: BadgeSize = 'md'
const size = ref<BadgeSize>(initialSize)
const sizes: BadgeSize[] = ['sm', 'md', 'lg']

const code = computed(
  () => `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'

const size = '${size.value}' as const
${scriptEnd}

<template>
  <Badge label="Status" :size="size" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño y el espaciado interno del badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="badge-size">
        size
        <select
          id="badge-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="badgeSize in sizes" :key="badgeSize" :value="badgeSize">
            {{ badgeSize }}
          </option>
        </select>
      </label>
    </template>
    <Badge label="Status" :size="size" />
  </ComponentExample>
</template>
