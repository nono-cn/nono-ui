import { computed, type Ref } from 'vue'
import type { PopoverArrowConfig } from '@/components/ui/Popover'
import { cn } from '@/lib/utils'

const arrowDefaults = {
  width: 10,
  height: 5,
  rounded: false,
}

export function useArrow(arrow: Ref<PopoverArrowConfig | undefined>) {
  return computed(() => {
    const config = arrow.value ?? {}
    const { class: configClass, style: configStyle, ...props } = config
    return {
      ...props,
      width: config.width ?? arrowDefaults.width,
      height: config.height ?? arrowDefaults.height,
      rounded: config.rounded ?? arrowDefaults.rounded,
      class: cn('fill-popover', configClass),
      style: configStyle,
    }
  })
}
