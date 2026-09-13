<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuArrow,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import type { DropdownMenuEmits, DropdownMenuProps, DropdownMenuSlots } from '.'
import { dropdownMenuDefaults } from './default'

defineOptions({ inheritAttrs: false })
defineSlots<DropdownMenuSlots>()

const props = withDefaults(defineProps<DropdownMenuProps>(), dropdownMenuDefaults)
const emit = defineEmits<DropdownMenuEmits>()
const open = defineModel<boolean>('open', { default: false })
const portalTarget = ref<HTMLElement>()

const rootProps = computed(() => ({ modal: props.modal }))
const triggerProps = computed(() => ({
  disabled: props.disabled,
  class: cn(''),
}))
const portalProps = computed(() => ({
  disabled: props.disabled,
  to: portalTarget.value,
}))
const contentProps = computed(() => ({
  align: props.align,
  alignFlip: props.alignFlip,
  alignOffset: props.alignOffset,
  arrowPadding: props.arrowPadding,
  avoidCollisions: props.avoidCollisions,
  collisionBoundary: props.collisionBoundary,
  collisionPadding: props.collisionPadding,
  disableUpdateOnLayoutShift: props.disableUpdateOnLayoutShift,
  forceMount: props.forceMount,
  hideShiftedArrow: props.hideShiftedArrow,
  hideWhenDetached: props.hideWhenDetached,
  loop: props.loop,
  positionStrategy: props.positionStrategy,
  prioritizePosition: props.prioritizePosition,
  side: props.side,
  sideFlip: props.sideFlip,
  sideOffset: props.sideOffset,
  sticky: props.sticky,
  updatePositionStrategy: props.updatePositionStrategy,
  onCloseAutoFocus: (event: DropdownMenuEmits['closeAutoFocus'][0]) =>
    emit('closeAutoFocus', event),
  onEscapeKeyDown: (event: DropdownMenuEmits['escapeKeyDown'][0]) => emit('escapeKeyDown', event),
  onFocusOutside: (event: DropdownMenuEmits['focusOutside'][0]) => emit('focusOutside', event),
  onInteractOutside: (event: DropdownMenuEmits['interactOutside'][0]) =>
    emit('interactOutside', event),
  onPointerDownOutside: (event: DropdownMenuEmits['pointerDownOutside'][0]) =>
    emit('pointerDownOutside', event),
}))
const arrowProps = computed(() => ({
  height: props.heightArrow,
  rounded: props.roundedArrow,
  width: props.widthArrow,
}))
</script>

<template>
  <div>
    <DropdownMenuRoot v-bind="rootProps" v-model:open="open" data-test-dropdown-menu-root>
      <DropdownMenuTrigger v-bind="triggerProps" as-child data-test-dropdown-menu-trigger>
        <slot></slot>
      </DropdownMenuTrigger>
      <DropdownMenuPortal v-bind="portalProps">
        <DropdownMenuContent v-bind="contentProps" data-test-dropdown-menu-content>
          <slot name="content" />
          <DropdownMenuArrow v-bind="arrowProps" data-test-dropdown-menu-arrow />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
    <div ref="portalTarget" data-test-dropdown-menu-portal-target />
  </div>
</template>
