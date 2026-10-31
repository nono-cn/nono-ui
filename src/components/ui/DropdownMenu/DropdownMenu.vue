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
import { arrowPaths } from '@/components/ui/constants'
import {
  dropdownMenuArrowVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  type DropdownMenuContext,
  type DropdownMenuEmits,
  type DropdownMenuProps,
  type DropdownMenuSlots,
} from '.'
import { dropdownMenuDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<DropdownMenuSlots>()

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  ...dropdownMenuDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<DropdownMenuEmits>()

const open = defineModel<boolean>('open', { default: dropdownMenuDefaults.open })

function close() {
  open.value = false
}

const dropdownMenuContext = computed<DropdownMenuContext>(() => ({ open: open.value, close }))

const rootProps = computed(() => {
  return {
    modal: props.modal,
  }
})

const triggerProps = computed(() => {
  return {
    as: 'button' as const,
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
</script>

<template>
  <DropdownMenuRoot v-bind="rootProps" v-model:open="open">
    <DropdownMenuTrigger v-bind="triggerProps" data-test-dropdown-menu-trigger>
      <slot v-bind="dropdownMenuContext" />
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
          {{ item.label }}
        </DropdownMenuItem>
        <DropdownMenuArrow v-if="props.showArrow" v-bind="arrowProps" data-test-dropdown-menu-arrow>
          <path
            :d="arrowProps.rounded ? arrowPaths.rounded : arrowPaths.sharp"
            vector-effect="non-scaling-stroke"
          />
        </DropdownMenuArrow>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
