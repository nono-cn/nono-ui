import { computed, type HTMLAttributes, type Ref } from 'vue'
import { cn } from '@/lib/utils'

type ClassStyle = Pick<HTMLAttributes, 'class' | 'style'>

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

export function useContent<T extends ClassStyle>(content: Ref<T | undefined>) {
  return computed(() => {
    const config = content.value ?? ({} as T)
    const { class: configClass, style: configStyle, ...props } = config
    return {
      ...contentDefaults,
      ...props,
      class: cn(configClass),
      style: configStyle,
    }
  })
}
