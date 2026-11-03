<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  TagGroupItem,
  TagGroupItemDelete,
  TagGroupItemText,
  TagGroupRoot,
  type AcceptableValue,
} from 'reka-ui'
import { Icon } from '@/components/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  tagGroupDeleteIconVariants,
  tagGroupDeleteTargetVariants,
  tagGroupDeleteVariants,
  tagGroupEmptyVariants,
  tagGroupIconVariants,
  tagGroupItemVariants,
  tagGroupLabelVariants,
  tagGroupVariants,
  type TagGroupEmits,
  type TagGroupItemContext,
  type TagGroupModelValue,
  type TagGroupProps,
  type TagGroupSlots,
  type TagGroupValue,
} from '.'
import { tagGroupDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TagGroupProps>(), tagGroupDefaults)
defineSlots<TagGroupSlots>()
const emit = defineEmits<TagGroupEmits>()

const attrs = useAttrs()
const slots = useSlots()
const modelValue = defineModel<TagGroupModelValue>()
const { t } = useI18n()

const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'tag-group',
  defaultColor: tagGroupDefaults.color,
  radius: () => props.radius,
  defaultRadius: tagGroupDefaults.radius,
})

const selectedValues = computed<TagGroupValue[]>(() => {
  if (props.selectionMode === 'none' || modelValue.value === undefined) return []
  return Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
})

const itemContexts = computed<TagGroupItemContext[]>(() =>
  props.items.map((item, index) => ({
    item,
    index,
    selected: selectedValues.value.some((value) => Object.is(value, item.value)),
    disabled: props.disabled || Boolean(item.disabled),
  })),
)

const rootProps = computed(() => ({
  ...attrs,
  selectionMode: props.selectionMode,
  disabled: props.disabled,
  disallowEmptySelection: props.disallowEmptySelection,
  escapeKeyBehavior: props.escapeKeyBehavior,
  loop: props.loop,
  onRemove: props.removable ? onRemove : undefined,
  class: cn(tagGroupVariants({ size: props.size }), attrs.class),
  style: [colorStyle.value, radiusStyle.value, attrs.style],
}))

function getItemProps(itemContext: TagGroupItemContext) {
  const ui = useUi(props.ui?.item, itemContext)

  return {
    ...ui,
    value: itemContext.item.value,
    disabled: Boolean(itemContext.item.disabled),
    textValue: itemContext.item.label,
    class: cn(
      tagGroupItemVariants({
        size: props.size,
        variant: props.variant,
        selectable: props.selectionMode !== 'none',
      }),
      ui.class,
    ),
  }
}

function getIconProps(itemContext: TagGroupItemContext) {
  return {
    name: itemContext.item.icon!,
    color: 'currentColor',
    class: tagGroupIconVariants({ size: props.size }),
  }
}

function getLabelProps(itemContext: TagGroupItemContext) {
  const ui = useUi(props.ui?.label, itemContext)

  return {
    ...ui,
    class: cn(tagGroupLabelVariants(), ui.class),
  }
}

function getDeleteProps(itemContext: TagGroupItemContext) {
  const ui = useUi(props.ui?.delete, itemContext)

  return {
    'aria-label': t('tagGroupRemove'),
    ...ui,
    class: cn(
      tagGroupDeleteVariants({ size: props.size }),
      ui.class,
      tagGroupDeleteTargetVariants(),
    ),
  }
}

const deleteIconProps = computed(() => ({
  name: 'x' as const,
  color: 'currentColor',
  class: tagGroupDeleteIconVariants({ size: props.size }),
}))

const emptyProps = computed(() => {
  const ui = useUi(props.ui?.empty, undefined)

  return {
    ...ui,
    class: cn(tagGroupEmptyVariants({ size: props.size }), ui.class),
  }
})

const hasEmpty = computed(() => !props.items.length && Boolean(props.empty || slots.empty))

function hasLeading(itemContext: TagGroupItemContext) {
  return Boolean(itemContext.item.icon || slots.leading)
}

function hasLabel(itemContext: TagGroupItemContext) {
  return Boolean(itemContext.item.label || slots.label)
}

function onUpdateModelValue(value: AcceptableValue | AcceptableValue[] | undefined) {
  const next = value as TagGroupModelValue | undefined
  modelValue.value = next
  emit('change', next)
}

function onRemove(values: AcceptableValue[]) {
  emit('remove', values as TagGroupValue[])
}

function getKey(itemContext: TagGroupItemContext) {
  return String(itemContext.item.value)
}
</script>

<template>
  <TagGroupRoot
    :model-value="modelValue"
    v-bind="rootProps"
    data-test-tag-group-root
    @update:model-value="onUpdateModelValue"
  >
    <TagGroupItem
      v-for="itemContext in itemContexts"
      :key="getKey(itemContext)"
      v-bind="getItemProps(itemContext)"
      data-test-tag-group-item
    >
      <template v-if="hasLeading(itemContext)">
        <slot name="leading" v-bind="itemContext">
          <Icon v-bind="getIconProps(itemContext)" data-test-tag-group-icon />
        </slot>
      </template>

      <TagGroupItemText
        v-if="hasLabel(itemContext)"
        v-bind="getLabelProps(itemContext)"
        data-test-tag-group-label
      >
        <slot name="label" v-bind="itemContext">{{ itemContext.item.label }}</slot>
      </TagGroupItemText>

      <TagGroupItemDelete
        v-if="props.removable"
        v-bind="getDeleteProps(itemContext)"
        data-test-tag-group-delete
      >
        <slot name="deleteIcon" v-bind="itemContext">
          <Icon v-bind="deleteIconProps" data-test-tag-group-delete-icon />
        </slot>
      </TagGroupItemDelete>
    </TagGroupItem>

    <span v-if="hasEmpty" v-bind="emptyProps" data-test-tag-group-empty>
      <slot name="empty">{{ props.empty }}</slot>
    </span>
  </TagGroupRoot>
</template>
