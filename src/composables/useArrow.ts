import { computed, type Ref } from 'vue'
import { cn } from '@/lib/utils'

export interface ArrowOptions<T extends object> {
  class?: string
}

const arrowDefaults = { width: 10, height: 5, rounded: false }

export function useArrow<T extends object>(
  arrow: Ref<T | undefined>,
  options: ArrowOptions<T> = {},
) {
  return computed(() => {
    const config = arrow.value ?? {}
    const { class: configClass, style: configStyle, ...props } = config
    return {
      ...arrowDefaults,
      ...props,
      class: cn(options.class, configClass),
      style: configStyle,
    }
  })
}
