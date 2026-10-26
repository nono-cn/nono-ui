<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'
import { Button, toIconButtonSize } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationListVariants,
  paginationVariants,
  type PaginationContext,
  type PaginationControl,
  type PaginationEmits,
  type PaginationGeneratedItem,
  type PaginationItemContext,
  type PaginationProps,
  type PaginationSlots,
} from '.'
import { paginationDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), paginationDefaults)
defineSlots<PaginationSlots>()
defineEmits<PaginationEmits>()

const attrs = useAttrs()
const page = defineModel<number>('page', { default: 1 })
const { t } = useI18n()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))))

const context = computed<PaginationContext>(() => ({
  page: page.value,
  pageCount: pageCount.value,
  disabled: props.disabled,
}))

const rootProps = computed(() => ({
  ...attrs,
  total: props.total,
  itemsPerPage: props.itemsPerPage,
  siblingCount: props.siblingCount,
  showEdges: props.showEdges,
  disabled: props.disabled,
  class: cn(paginationVariants(), attrs.class),
  style: attrs.style,
}))

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, context.value)

  return {
    ...ui,
    class: cn(paginationListVariants(), ui.class),
  }
})

const controlButtonProps = computed(() => ({
  color: props.color,
  variant: props.variant,
  size: toIconButtonSize(props.size),
}))

function getControlProps(control: PaginationControl) {
  const ui = useUi(props.ui?.[control], context.value)

  return {
    'aria-label': t(control),
    ...ui,
    asChild: true,
  }
}

function getItemContexts(items: PaginationGeneratedItem[]): PaginationItemContext[] {
  return items.map((item, index) => ({
    item,
    index,
    active: item.type === 'page' && item.value === page.value,
    disabled: props.disabled,
  }))
}

function getItemProps(itemContext: PaginationItemContext, value: number) {
  const ui = useUi(props.ui?.item, itemContext)

  return {
    'aria-label': t('page_{n}', { n: value }),
    ...ui,
    value,
    asChild: true,
  }
}

function getItemButtonProps(itemContext: PaginationItemContext, value: number) {
  return {
    label: String(value),
    color: itemContext.active ? (props.activeColor ?? props.color) : props.color,
    variant: itemContext.active ? props.activeVariant : props.variant,
    size: props.size,
    class: paginationItemVariants({ size: props.size }),
  }
}

function getEllipsisProps(itemContext: PaginationItemContext) {
  const ui = useUi(props.ui?.ellipsis, itemContext)

  return {
    role: 'img',
    'aria-label': t('morePages'),
    ...ui,
    class: cn(paginationEllipsisVariants({ size: props.size }), ui.class),
  }
}

function getKey(itemContext: PaginationItemContext) {
  return itemContext.item.type === 'page'
    ? `item-${itemContext.item.value}`
    : `ellipsis-${itemContext.index}`
}
</script>

<template>
  <PaginationRoot v-model:page="page" v-bind="rootProps" data-test-pagination-root>
    <PaginationList v-slot="{ items }" v-bind="listProps" data-test-pagination-list>
      <slot name="leading" v-bind="context" />

      <PaginationFirst
        v-if="props.showControls"
        v-bind="getControlProps('first')"
        data-test-pagination-first
      >
        <slot name="first" v-bind="context">
          <Button v-bind="controlButtonProps" :icon="props.firstIcon" />
        </slot>
      </PaginationFirst>

      <PaginationPrev
        v-if="props.showControls"
        v-bind="getControlProps('previous')"
        data-test-pagination-previous
      >
        <slot name="previous" v-bind="context">
          <Button v-bind="controlButtonProps" :icon="props.previousIcon" />
        </slot>
      </PaginationPrev>

      <template v-for="itemContext in getItemContexts(items)" :key="getKey(itemContext)">
        <PaginationListItem
          v-if="itemContext.item.type === 'page'"
          v-bind="getItemProps(itemContext, itemContext.item.value)"
          data-test-pagination-item
        >
          <slot name="item" v-bind="itemContext">
            <Button v-bind="getItemButtonProps(itemContext, itemContext.item.value)" />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis
          v-else
          v-bind="getEllipsisProps(itemContext)"
          data-test-pagination-ellipsis
        >
          <slot name="ellipsis" v-bind="itemContext">
            <Icon :name="props.ellipsisIcon" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext
        v-if="props.showControls"
        v-bind="getControlProps('next')"
        data-test-pagination-next
      >
        <slot name="next" v-bind="context">
          <Button v-bind="controlButtonProps" :icon="props.nextIcon" />
        </slot>
      </PaginationNext>

      <PaginationLast
        v-if="props.showControls"
        v-bind="getControlProps('last')"
        data-test-pagination-last
      >
        <slot name="last" v-bind="context">
          <Button v-bind="controlButtonProps" :icon="props.lastIcon" />
        </slot>
      </PaginationLast>

      <slot name="trailing" v-bind="context" />
    </PaginationList>
  </PaginationRoot>
</template>
