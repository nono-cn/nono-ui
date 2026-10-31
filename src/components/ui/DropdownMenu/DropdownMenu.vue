<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import {
  dropdownMenuArrowVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemDescriptionVariants,
  dropdownMenuItemIconVariants,
  dropdownMenuItemLabelVariants,
  dropdownMenuItemLeadingVariants,
  dropdownMenuItemWrapperVariants,
  dropdownMenuItemVariants,
  type DropdownMenuEmits,
  type DropdownMenuItem as DropdownMenuItemType,
  type DropdownMenuItemContext,
  type DropdownMenuProps,
  type DropdownMenuSlots,
} from '.'
import { dropdownMenuDefaults } from './constants'

defineOptions({ inheritAttrs: false })
const slots = defineSlots<DropdownMenuSlots>()

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  ...dropdownMenuDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<DropdownMenuEmits>()

const open = defineModel<boolean>('open', { default: dropdownMenuDefaults.open })

const rootProps = computed(() => {
  return {
    modal: props.modal,
  }
})

const triggerProps = computed(() => {
  return {
    asChild: true,
    disabled: props.disabled,
  }
})

const portalProps = {
  to: 'body',
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}

const contentProps = computed(() => {
  return {
    ...dropdownMenuDefaults.content,
    ...props.content,
    class: dropdownMenuContentVariants(),
  }
})

const arrowProps = computed(() => {
  return {
    ...dropdownMenuDefaults.arrow,
    ...props.arrow,
    class: dropdownMenuArrowVariants(),
  }
})

const itemProps = computed(() => {
  return {
    class: dropdownMenuItemVariants({ size: props.size }),
  }
})

const itemLeadingProps = computed(() => {
  return {
    class: dropdownMenuItemLeadingVariants({ size: props.size }),
  }
})

const itemIconProps = {
  class: dropdownMenuItemIconVariants(),
}

const itemWrapperProps = {
  class: dropdownMenuItemWrapperVariants(),
}

const itemLabelProps = {
  class: dropdownMenuItemLabelVariants(),
}

const itemDescriptionProps = computed(() => {
  return {
    class: dropdownMenuItemDescriptionVariants({ size: props.size }),
  }
})

function getItemContext(item: DropdownMenuItemType, index: number): DropdownMenuItemContext {
  return { item, index }
}
</script>

<template>
  <DropdownMenuRoot v-bind="rootProps" v-model:open="open">
    <DropdownMenuTrigger v-bind="triggerProps" data-test-dropdown-menu-trigger>
      <slot />
    </DropdownMenuTrigger>

    <DropdownMenuPortal v-bind="portalProps">
      <DropdownMenuContent
        v-if="props.items?.length"
        v-bind="contentProps"
        data-test-dropdown-menu-content
      >
        <DropdownMenuItem
          v-for="(item, index) in props.items"
          :key="index"
          v-bind="itemProps"
          data-test-dropdown-menu-item
        >
          <span
            v-if="item.icon || slots['item-leading']"
            v-bind="itemLeadingProps"
            data-test-dropdown-menu-item-leading
          >
            <slot name="item-leading" v-bind="getItemContext(item, index)">
              <Icon
                v-if="item.icon"
                :name="item.icon"
                v-bind="itemIconProps"
                data-test-dropdown-menu-item-icon
              />
            </slot>
          </span>
          <span v-bind="itemWrapperProps" data-test-dropdown-menu-item-wrapper>
            <span
              v-if="item.label || slots['item-label']"
              v-bind="itemLabelProps"
              data-test-dropdown-menu-item-label
            >
              <slot name="item-label" v-bind="getItemContext(item, index)">
                {{ item.label }}
              </slot>
            </span>
            <span
              v-if="item.description"
              v-bind="itemDescriptionProps"
              data-test-dropdown-menu-item-description
            >
              {{ item.description }}
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuArrow
          v-if="props.showArrow"
          v-bind="arrowProps"
          data-test-dropdown-menu-arrow
        />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
