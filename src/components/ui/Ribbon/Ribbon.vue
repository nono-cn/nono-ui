<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getThemeColorStyle } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  ribbonBandVariants,
  ribbonContentVariants,
  ribbonVariants,
  type RibbonItemContext,
  type RibbonProps,
  type RibbonSlots,
} from '.'
import { ribbonDefaults, ribbonItemDefaults, ribbonRotations } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<RibbonSlots>()

const props = withDefaults(defineProps<RibbonProps>(), ribbonDefaults)

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  class: cn(ribbonVariants(), attrs.class),
  style: attrs.style,
}))

const itemContexts = computed<RibbonItemContext[]>(() =>
  props.ribbons.map((item, index) => ({ item, index })),
)

function getBandProps(context: RibbonItemContext) {
  const ui = useUi(props.ui?.band, context)
  const position = context.item.position ?? ribbonItemDefaults.position

  return {
    ...ui,
    class: cn(ribbonBandVariants({ position }), ui.class),
    style: [
      getThemeColorStyle(context.item.color, 'ribbon', ribbonItemDefaults.color),
      {
        zIndex: context.item.zIndex ?? ribbonItemDefaults.zIndex + context.index,
        transform: `rotate(${context.item.rotate ?? ribbonRotations[position]}deg)`,
      },
      ui.style,
    ],
    'aria-hidden': true,
  }
}

function getLabelProps(context: RibbonItemContext) {
  return useUi(props.ui?.label, context)
}

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)

  return {
    ...ui,
    class: cn(ribbonContentVariants(), ui.class),
  }
})

function getSlotName(context: RibbonItemContext) {
  const slot = context.item.slot
  return slot === undefined ? 'label' : (`label-${slot}` as const)
}

function getKey(context: RibbonItemContext) {
  return context.item.slot ?? context.index
}
</script>

<template>
  <div v-bind="rootProps" data-test-ribbon-root>
    <div
      v-for="context in itemContexts"
      :key="getKey(context)"
      v-bind="getBandProps(context)"
      data-test-ribbon-band
    >
      <span v-bind="getLabelProps(context)" data-test-ribbon-label>
        <slot :name="getSlotName(context)" v-bind="context">
          <slot name="label" v-bind="context">{{ context.item.label }}</slot>
        </slot>
      </span>
    </div>

    <div v-bind="contentProps" data-test-ribbon-content>
      <slot />
    </div>
  </div>
</template>
