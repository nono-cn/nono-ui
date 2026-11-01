<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { getThemeColorStyle } from '@/composables/useTheme'
import {
  dropdownMenuArrowVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemDescriptionVariants,
  dropdownMenuItemIconVariants,
  dropdownMenuItemLabelVariants,
  dropdownMenuItemLeadingVariants,
  dropdownMenuItemWrapperVariants,
  dropdownMenuItemVariants,
  dropdownMenuSeparatorVariants,
  type DropdownMenuEmits,
  type DropdownMenuItem as DropdownMenuItemType,
  type DropdownMenuItemContext,
  type DropdownMenuProps,
  type DropdownMenuSlots,
} from '.'
import { dropdownMenuDefaults } from './constants'

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

const itemLeadingProps = computed(() => {
  return {
    class: dropdownMenuItemLeadingVariants({ size: props.size }),
  }
})

const itemIconProps = {
  class: dropdownMenuItemIconVariants(),
}

const itemWrapperProps = {
  class: dropdownMenuItemWrapperVariants(),
}

const itemLabelProps = {
  class: dropdownMenuItemLabelVariants(),
}

const itemDescriptionProps = computed(() => {
  return {
    class: dropdownMenuItemDescriptionVariants({ size: props.size }),
  }
})

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
            <DropdownMenuItem
              v-for="(item, index) in group"
              :key="index"
              v-bind="getItemProps(item)"
              data-test-dropdown-menu-item
              @select="item.onSelect"
            >
              <slot name="item" v-bind="getItemContext(item, index, groupIndex)">
                <span
                  v-if="item.icon || slots['item-leading']"
                  v-bind="itemLeadingProps"
                  data-test-dropdown-menu-item-leading
                >
                  <slot name="item-leading" v-bind="getItemContext(item, index, groupIndex)">
                    <Icon
                      v-if="item.icon"
                      :name="item.icon"
                      v-bind="itemIconProps"
                      data-test-dropdown-menu-item-icon
                    />
                  </slot>
                </span>
                <span v-bind="itemWrapperProps" data-test-dropdown-menu-item-wrapper>
                  <span
                    v-if="item.label || slots['item-label']"
                    v-bind="itemLabelProps"
                    data-test-dropdown-menu-item-label
                  >
                    <slot name="item-label" v-bind="getItemContext(item, index, groupIndex)">
                      {{ item.label }}
                    </slot>
                  </span>
                  <span
                    v-if="item.description || slots['item-description']"
                    v-bind="itemDescriptionProps"
                    data-test-dropdown-menu-item-description
                  >
                    <slot name="item-description" v-bind="getItemContext(item, index, groupIndex)">
                      {{ item.description }}
                    </slot>
                  </span>
                </span>
              </slot>
            </DropdownMenuItem>
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
