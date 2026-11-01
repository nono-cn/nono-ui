<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@/components/ui/Icon'
import {
  dropdownMenuItemDescriptionVariants,
  dropdownMenuItemIconVariants,
  dropdownMenuItemLabelVariants,
  dropdownMenuItemLeadingVariants,
  dropdownMenuItemWrapperVariants,
  type DropdownMenuItemContext,
  type DropdownMenuSize,
  type DropdownMenuSlots,
} from '.'

const props = defineProps<{
  context: DropdownMenuItemContext
  size: DropdownMenuSize
}>()
const slots = defineSlots<Omit<DropdownMenuSlots, 'default' | 'item'>>()

const item = computed(() => props.context.item)

const leadingProps = computed(() => {
  return {
    class: dropdownMenuItemLeadingVariants({ size: props.size }),
  }
})

const iconProps = {
  class: dropdownMenuItemIconVariants(),
}

const wrapperProps = {
  class: dropdownMenuItemWrapperVariants(),
}

const labelProps = {
  class: dropdownMenuItemLabelVariants(),
}

const descriptionProps = computed(() => {
  return {
    class: dropdownMenuItemDescriptionVariants({ size: props.size }),
  }
})
</script>

<template>
  <span
    v-if="item.icon || slots['item-leading']"
    v-bind="leadingProps"
    data-test-dropdown-menu-item-leading
  >
    <slot name="item-leading" v-bind="context">
      <Icon
        v-if="item.icon"
        :name="item.icon"
        v-bind="iconProps"
        data-test-dropdown-menu-item-icon
      />
    </slot>
  </span>
  <span v-bind="wrapperProps" data-test-dropdown-menu-item-wrapper>
    <span
      v-if="item.label || slots['item-label']"
      v-bind="labelProps"
      data-test-dropdown-menu-item-label
    >
      <slot name="item-label" v-bind="context">
        {{ item.label }}
      </slot>
    </span>
    <!-- un label solo usa label e icon -->
    <span
      v-if="item.type !== 'label' && (item.description || slots['item-description'])"
      v-bind="descriptionProps"
      data-test-dropdown-menu-item-description
    >
      <slot name="item-description" v-bind="context">
        {{ item.description }}
      </slot>
    </span>
  </span>
</template>
