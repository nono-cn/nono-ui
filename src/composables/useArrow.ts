import { computed, type HTMLAttributes, type Ref } from 'vue'
import { cn } from '@/lib/utils'

type ClassStyle = Pick<HTMLAttributes, 'class' | 'style'>

const arrowDefaults = { width: 10, height: 5, rounded: false }

export function useArrow<T extends ClassStyle>(arrow: Ref<T | undefined>) {
  return computed(() => {
    const config = arrow.value ?? ({} as T)
    const { class: configClass, style: configStyle, ...props } = config
    return {
      ...arrowDefaults,
      ...props,
      class: cn(configClass),
      style: configStyle,
    }
  })
}
