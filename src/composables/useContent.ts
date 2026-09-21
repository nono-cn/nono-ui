import { computed, type Ref } from 'vue'
import { cn } from '@/lib/utils'

export interface ContentOptions<T extends object> {
  class?: string
}

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

export function useContent<T extends object>(
  content: Ref<T | undefined>,
  options: ContentOptions<T> = {},
) {
  return computed(() => {
    const config = content.value ?? {}
    const { class: configClass, style: configStyle, ...props } = config

    return {
      ...contentDefaults,
      ...props,
      class: cn(options.class, configClass),
      style: configStyle,
    }
  })
}
