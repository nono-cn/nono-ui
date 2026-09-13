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
import DropdownMenuOption from './DropdownMenuOption.vue'
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
  class:
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
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
          <DropdownMenuOption v-for="(item, index) in props.items" :key="index" :item="item" :index="index" :value="String(index)">
              <template v-for="(_, slotName) in $slots" #[slotName]="slotProps" :key="slotName">
                <slot :name="slotName" v-bind="slotProps" />
              </template>
          </DropdownMenuOption>
          <slot v-if="!props.items?.length" />
          <DropdownMenuArrow v-bind="arrowProps" data-test-dropdown-menu-arrow />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
    <div ref="portalTarget" data-test-dropdown-menu-portal-target />
  </div>
</template>
