import { computed, type Ref } from 'vue'
import type { PopoverContentConfig } from '@/components/ui/Popover'
import { cn } from '@/lib/utils'

const contentDefaults = {
  align: 'center' as const,
  alignFlip: true,
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionPadding: 8,
  disableUpdateOnLayoutShift: false,
  hideShiftedArrow: true,
  hideWhenDetached: false,
  positionStrategy: 'fixed' as const,
  prioritizePosition: false,
  side: 'bottom' as const,
  sideFlip: true,
  sideOffset: 4,
  sticky: 'partial' as const,
  updatePositionStrategy: 'optimized' as const,
}

export function useContent(content: Ref<PopoverContentConfig | undefined>) {
  return computed(() => {
    const config = content.value ?? {}
    const { class: configClass, style: configStyle, ...props } = config

    return {
      ...contentDefaults,
      ...props,
      class: cn(
        'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        configClass,
      ),
      style: configStyle,
    }
  })
}
