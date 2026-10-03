import { computed, type Ref } from 'vue'
import { cn } from '@/lib/utils'

const arrowDefaults = { width: 10, height: 5, rounded: false }

export function useArrow<T extends object>(arrow: Ref<T | undefined>) {
  return computed(() => {
    const config = arrow.value ?? {}
    const { class: configClass, style: configStyle, ...props } = config
    return {
      ...arrowDefaults,
      ...props,
      class: cn(configClass),
      style: configStyle,
    }
  })
}
