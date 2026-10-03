<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { InputGroupAddonProps, InputGroupAddonSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputGroupAddonProps>(), {
  align: 'inline-start',
})

defineSlots<InputGroupAddonSlots>()

const attrs = useAttrs()
const rootProps = computed(() => {
  const alignmentClass = {
    'inline-start': 'shrink-0 px-3 py-1',
    'inline-end': 'shrink-0 px-3 py-1',
    'block-start': 'w-full px-3 py-2',
    'block-end': 'w-full px-3 py-2',
  }[props.align]

  return {
    ...attrs,
    'data-align': props.align,
    class: cn(
      'flex items-center gap-2 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-[1em]',
      alignmentClass,
      attrs.class,
    ),
    style: attrs.style,
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-input-group-addon>
    <slot />
  </div>
</template>
