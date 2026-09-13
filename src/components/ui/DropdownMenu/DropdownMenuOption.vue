<script setup lang="ts">
import { DropdownMenuItem as RekaDropdownMenuItem } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
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
</script>

<template>
  <RekaDropdownMenuItem :value="value" :disabled="item.disabled" data-test-dropdown-menu-item>
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
