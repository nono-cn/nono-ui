<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import { getThemeColorStyle } from '@/composables/useTheme'
import {
  dropdownMenuArrowVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuSeparatorVariants,
  type DropdownMenuEmits,
  type DropdownMenuItem as DropdownMenuItemType,
  type DropdownMenuItemContext,
  type DropdownMenuProps,
  type DropdownMenuSlots,
} from '.'
import { dropdownMenuDefaults } from './constants'
import DropdownMenuItemContent from './DropdownMenuItemContent.vue'

defineOptions({ inheritAttrs: false })
const slots = defineSlots<DropdownMenuSlots>()

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  ...dropdownMenuDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<DropdownMenuEmits>()

const open = defineModel<boolean>('open', { default: dropdownMenuDefaults.open })

const rootProps = computed(() => {
  return {
    modal: props.modal,
  }
})

const triggerProps = computed(() => {
  return {
    asChild: true,
    disabled: props.disabled,
  }
})

const portalProps = {
  to: 'body',
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}

const contentProps = computed(() => {
  return {
    ...dropdownMenuDefaults.content,
    ...props.content,
    class: dropdownMenuContentVariants(),
  }
})

const arrowProps = computed(() => {
  return {
    ...dropdownMenuDefaults.arrow,
    ...props.arrow,
    class: dropdownMenuArrowVariants(),
  }
})

const groups = computed<DropdownMenuItemType[][]>(() => {
  const items = props.items ?? []
  return Array.isArray(items[0])
    ? (items as DropdownMenuItemType[][])
    : [items as DropdownMenuItemType[]]
})

const separatorProps = {
  class: dropdownMenuSeparatorVariants(),
}

const labelProps = computed(() => {
  return {
    class: dropdownMenuLabelVariants({ size: props.size }),
  }
})

function getItemProps(item: DropdownMenuItemType) {
  return {
    disabled: item.disabled,
    textValue: item.textValue,
    class: dropdownMenuItemVariants({
      size: props.size,
      disabled: item.disabled,
      color: Boolean(item.color),
    }),
    style: item.color ? getThemeColorStyle(item.color, 'dropdown-menu-item', 'neutral') : undefined,
  }
}

function getItemContext(
  item: DropdownMenuItemType,
  index: number,
  groupIndex: number,
): DropdownMenuItemContext {
  return { item, index, groupIndex }
}
</script>

<template>
  <DropdownMenuRoot v-bind="rootProps" v-model:open="open">
    <DropdownMenuTrigger v-bind="triggerProps" data-test-dropdown-menu-trigger>
      <slot />
    </DropdownMenuTrigger>

    <DropdownMenuPortal v-bind="portalProps">
      <DropdownMenuContent
        v-if="props.items?.length"
        v-bind="contentProps"
        data-test-dropdown-menu-content
      >
        <template v-for="(group, groupIndex) in groups" :key="groupIndex">
          <DropdownMenuSeparator
            v-if="groupIndex > 0"
            v-bind="separatorProps"
            data-test-dropdown-menu-separator
          />
          <DropdownMenuGroup data-test-dropdown-menu-group>
            <template v-for="(item, index) in group" :key="index">
              <DropdownMenuLabel
                v-if="item.type === 'label'"
                v-bind="labelProps"
                data-test-dropdown-menu-label
              >
                <DropdownMenuItemContent
                  :context="getItemContext(item, index, groupIndex)"
                  :size="props.size"
                />
              </DropdownMenuLabel>
              <DropdownMenuItem
                v-else
                v-bind="getItemProps(item)"
                data-test-dropdown-menu-item
                @select="item.onSelect"
              >
                <slot name="item" v-bind="getItemContext(item, index, groupIndex)">
                  <DropdownMenuItemContent
                    :context="getItemContext(item, index, groupIndex)"
                    :size="props.size"
                  >
                    <template v-if="slots['item-leading']" #item-leading="slotProps">
                      <slot name="item-leading" v-bind="slotProps" />
                    </template>
                    <template v-if="slots['item-label']" #item-label="slotProps">
                      <slot name="item-label" v-bind="slotProps" />
                    </template>
                    <template v-if="slots['item-description']" #item-description="slotProps">
                      <slot name="item-description" v-bind="slotProps" />
                    </template>
                  </DropdownMenuItemContent>
                </slot>
              </DropdownMenuItem>
            </template>
          </DropdownMenuGroup>
        </template>
        <DropdownMenuArrow
          v-if="props.showArrow"
          v-bind="arrowProps"
          data-test-dropdown-menu-arrow
        />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
