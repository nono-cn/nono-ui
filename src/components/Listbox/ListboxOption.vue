<script setup lang="ts">
import { computed } from 'vue'
import {
  ListboxItem as RekaListboxItem,
  ListboxItemIndicator as RekaListboxItemIndicator,
} from 'reka-ui'
import { Icon } from '@/components/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { IconProps } from '@/components/Icon'
import type { ListboxItemContext, ListboxSize, ListboxSlots, ListboxUI } from '.'
import { listboxVariants } from '.'

const props = defineProps<{
  context: ListboxItemContext
  ui?: ListboxUI
  size?: ListboxSize
}>()
defineSlots<ListboxSlots>()
const emit = defineEmits<{
  select: [event: CustomEvent]
}>()

const itemProps = computed(() => {
  const ui = useUi(props.ui?.item, props.context)

  return {
    ...ui,
    value: props.context.item.value,
    disabled: props.context.item.disabled,
    class: cn(
      'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      listboxVariants({ size: props.size }),
      ui.class,
    ),
    style: ui.style,
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.itemLabel, props.context)
  return { ...ui, class: cn('flex-1', ui.class), style: ui.style }
})

const itemLeadingProps = computed(() => {
  const ui = useUi(props.ui?.itemLeading, props.context)
  return { ...ui, class: cn('flex items-center', ui.class), style: ui.style }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.itemIndicator, props.context)
  return { ...ui, class: cn('ml-auto flex size-4 items-center justify-center', ui.class) }
})

const iconProps = computed<IconProps>(() => props.context.item.icon!)
</script>

<template>
  <RekaListboxItem v-bind="itemProps" data-test-listbox-item @select="emit('select', $event)">
    <slot name="item" v-bind="context">
      <div v-bind="itemLeadingProps" data-test-listbox-item-leading>
        <slot name="item-leading" v-bind="context">
          <Icon v-if="context.item.icon" v-bind="iconProps" data-test-listbox-item-icon />
        </slot>
      </div>

      <span v-bind="labelProps" data-test-listbox-item-label>
        <slot name="item-label" v-bind="context">{{ context.item.label }}</slot>
      </span>

      <RekaListboxItemIndicator v-bind="indicatorProps" data-test-listbox-item-indicator>
        <slot name="item-indicator" v-bind="context">
          <Icon name="check" class="size-4" />
        </slot>
      </RekaListboxItemIndicator>
    </slot>
  </RekaListboxItem>
</template>
