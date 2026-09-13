<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { DropdownMenuItem as RekaDropdownMenuItem, DropdownMenuSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'
import DropdownMenuItem from './DropdownMenuItem.vue'
import type { DropdownMenuItem as ItemConfig, DropdownMenuItemContext, DropdownMenuSlots } from '.'

const props = defineProps<{ item: ItemConfig; index: number; value: string }>()
defineSlots<DropdownMenuSlots>()

const context: DropdownMenuItemContext = props
const itemProps = computed(() => ({
  value: props.value,
  disabled: props.item.disabled,
  onSelect: props.item.onSelect,
  class: cn(
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ),
}))
</script>

<template>
  <DropdownMenuSeparator
    v-if="item.type === 'separator'"
    class="-mx-1 my-1 h-px bg-border"
    data-test-dropdown-menu-separator
  />

  <RekaDropdownMenuItem
    v-else
    v-bind="itemProps"
    :as="item.to !== undefined ? RouterLink : undefined"
    :to="item.to"
    data-test-dropdown-menu-item
  >
    <DropdownMenuItem :item="item" :index="index" :value="value">
      <template v-for="(_, slotName) in $slots" #[slotName]="slotProps" :key="slotName"
        ><slot :name="slotName" v-bind="slotProps"
      /></template>
    </DropdownMenuItem>
  </RekaDropdownMenuItem>
</template>
