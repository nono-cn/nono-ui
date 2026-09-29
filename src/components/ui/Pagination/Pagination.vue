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
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  PaginationContext,
  PaginationEmits,
  PaginationGeneratedItem,
  PaginationItemContext,
  PaginationProps,
  PaginationSlots,
} from '.'
import { paginationDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), paginationDefaults)
defineEmits<PaginationEmits>()
defineSlots<PaginationSlots>()

const attrs = useAttrs()
const page = defineModel<number>('page', { default: 1 })
const { t } = useI18n()

const paginationContext = computed<PaginationContext>(() => {
  return {
    page: page.value,
    pageCount: props.itemsPerPage > 0 ? Math.ceil(props.total / props.itemsPerPage) : 0,
  }
})

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, paginationContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: 'nav' as const,
    asChild: false,
    total: props.total,
    itemsPerPage: props.itemsPerPage,
    siblingCount: props.siblingCount,
    showEdges: props.showEdges,
    disabled: props.disabled,
    class: cn(
      'mx-auto flex w-full flex-wrap items-center justify-center gap-3',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const listProps = computed(() => {
  const listUI = useUi(props.ui?.list, paginationContext.value)

  return {
    ...listUI,
    class: cn('flex flex-row flex-wrap items-center gap-1', listUI.class),
    style: listUI.style,
  }
})

const firstProps = computed(() => {
  const firstUI = useUi(props.ui?.first, paginationContext.value)

  return {
    ...firstUI,
    asChild: true,
    'aria-label': firstUI['aria-label'] ?? t('first'),
    class: cn(firstUI.class),
    style: firstUI.style,
  }
})

const previousProps = computed(() => {
  const previousUI = useUi(props.ui?.previous, paginationContext.value)

  return {
    ...previousUI,
    asChild: true,
    'aria-label': previousUI['aria-label'] ?? t('previus'),
    class: cn(previousUI.class),
    style: previousUI.style,
  }
})

const nextProps = computed(() => {
  const nextUI = useUi(props.ui?.next, paginationContext.value)

  return {
    ...nextUI,
    asChild: true,
    'aria-label': nextUI['aria-label'] ?? t('next'),
    class: cn(nextUI.class),
    style: nextUI.style,
  }
})

const lastProps = computed(() => {
  const lastUI = useUi(props.ui?.last, paginationContext.value)

  return {
    ...lastUI,
    asChild: true,
    'aria-label': lastUI['aria-label'] ?? t('last'),
    class: cn(lastUI.class),
    style: lastUI.style,
  }
})

const firstIconProps = computed(() => props.firstIcon)
const previousIconProps = computed(() => props.previousIcon)
const nextIconProps = computed(() => props.nextIcon)
const lastIconProps = computed(() => props.lastIcon)
const ellipsisIconProps = computed(() => props.ellipsisIcon)

function getItemContexts(items: PaginationGeneratedItem[]): PaginationItemContext[] {
  return items.map((item, index) => ({
    ...paginationContext.value,
    item,
    index,
    active: item.type === 'page' && item.value === paginationContext.value.page,
    first: index === 0,
    last: index === items.length - 1,
  }))
}

function getItemProps(context: PaginationItemContext) {
  const ui = useUi(props.ui?.item, context)

  return {
    ...ui,
    asChild: true,
    'aria-label':
      context.item.type === 'page'
        ? (ui['aria-label'] ?? t('page_{n}', { n: context.item.value }))
        : undefined,
    class: cn(ui.class),
    style: ui.style,
  }
}

function getEllipsisProps(context: PaginationItemContext) {
  const ui = useUi(props.ui?.ellipsis, context)

  return {
    ...ui,
    asChild: true,
    'aria-label': ui['aria-label'] ?? t('morePages'),
    class: cn('flex items-center justify-center', ui.class),
    style: ui.style,
  }
}

function getItemKey(context: PaginationItemContext) {
  return context.item.type === 'page' ? `item-${context.item.value}` : `ellipsis-${context.index}`
}

function getItemSlotName(context: PaginationItemContext): `item-${string}` {
  return `item-${context.item.type === 'page' ? context.item.value : context.index}`
}

function getEllipsisSlotName(context: PaginationItemContext): `ellipsis-${string}` {
  return `ellipsis-${context.index}`
}
</script>

<template>
  <PaginationRoot v-model:page="page" v-bind="rootProps" data-test-pagination-root>
    <PaginationList v-slot="{ items }" v-bind="listProps" data-test-pagination-list>
      <slot name="preContent" v-bind="paginationContext" />

      <PaginationFirst v-if="props.showControls" v-bind="firstProps" data-test-pagination-first>
        <slot name="first" v-bind="paginationContext">
          <Button
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          >
            <template #leading><Icon v-bind="firstIconProps" /></template>
          </Button>
        </slot>
      </PaginationFirst>

      <PaginationPrev
        v-if="props.showControls"
        v-bind="previousProps"
        data-test-pagination-previous
      >
        <slot name="previous" v-bind="paginationContext">
          <Button
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          >
            <template #leading><Icon v-bind="previousIconProps" /></template>
          </Button>
        </slot>
      </PaginationPrev>

      <template v-for="itemContext in getItemContexts(items)" :key="getItemKey(itemContext)">
        <PaginationListItem
          v-if="itemContext.item.type === 'page'"
          v-bind="getItemProps(itemContext)"
          :value="itemContext.item.value"
          data-test-pagination-item
        >
          <slot :name="getItemSlotName(itemContext)" v-bind="itemContext">
            <slot name="item" v-bind="itemContext">
              <Button
                :label="String(itemContext.item.value)"
                :color="itemContext.active ? (props.activeColor ?? props.color) : props.color"
                :variant="
                  itemContext.active ? (props.activeVariant ?? props.variant) : props.variant
                "
                :severity="props.severity"
                :size="props.size"
                square
              />
            </slot>
          </slot>
        </PaginationListItem>

        <PaginationEllipsis
          v-else
          v-bind="getEllipsisProps(itemContext)"
          data-test-pagination-ellipsis
        >
          <slot :name="getEllipsisSlotName(itemContext)" v-bind="itemContext">
            <slot name="ellipsis" v-bind="itemContext">
              <Button
                :color="props.color"
                :variant="props.variant"
                :severity="props.severity"
                :size="props.size"
                as="span"
                square
              >
                <template #leading><Icon v-bind="ellipsisIconProps" /></template>
              </Button>
            </slot>
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls" v-bind="nextProps" data-test-pagination-next>
        <slot name="next" v-bind="paginationContext">
          <Button
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          >
            <template #leading><Icon v-bind="nextIconProps" /></template>
          </Button>
        </slot>
      </PaginationNext>

      <PaginationLast v-if="props.showControls" v-bind="lastProps" data-test-pagination-last>
        <slot name="last" v-bind="paginationContext">
          <Button
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          >
            <template #leading><Icon v-bind="lastIconProps" /></template>
          </Button>
        </slot>
      </PaginationLast>

      <slot name="postContent" v-bind="paginationContext" />
    </PaginationList>

    <slot v-bind="paginationContext" />
  </PaginationRoot>
</template>
