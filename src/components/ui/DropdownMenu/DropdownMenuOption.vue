<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuItem as RekaDropdownMenuItem, DropdownMenuSeparator } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type {
  DropdownMenuItem as DropdownMenuItemConfig,
  DropdownMenuItemContext,
  DropdownMenuSlots,
} from '.'

const props = defineProps<{
  item: DropdownMenuItemConfig
  index: number
  value: string
}>()
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
  <DropdownMenuSeparator v-if="item.type === 'separator'" class="-mx-1 my-1 h-px bg-border" data-test-dropdown-menu-separator />
  <RekaDropdownMenuItem v-else
    v-bind="itemProps"
    data-test-dropdown-menu-item
  >
    <slot name="item" v-bind="context">
      <div data-test-dropdown-menu-item-leading>
        <slot name="item-leading" v-bind="context">
          <Icon v-if="item.icon" v-bind="item.icon" data-test-dropdown-menu-item-icon />
        </slot>
      </div>
      <div data-test-dropdown-menu-item-label>
        <slot name="item-label" v-bind="context">{{ item.label }}</slot>
      </div>
    </slot>
  </RekaDropdownMenuItem>
</template>
