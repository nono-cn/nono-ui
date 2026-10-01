<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  BreadcrumbEllipsisContext,
  BreadcrumbItem,
  BreadcrumbItemContext,
  BreadcrumbProps,
  BreadcrumbSlots,
} from '.'
import { breadcrumbListVariants, breadcrumbVariants } from '.'
import { breadcrumbDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()
const props = withDefaults(defineProps<BreadcrumbProps>(), breadcrumbDefaults)
defineSlots<BreadcrumbSlots>()

const attrs = useAttrs()
const ellipsisRange = computed(() => props.ellipsisIndex ?? [])
const hasEllipsis = computed(() => {
  const [start, end] = ellipsisRange.value
  return (
    start !== undefined &&
    end !== undefined &&
    start >= 0 &&
    end > start &&
    end < props.items.length - 1
  )
})

const ellipsisContext = computed<BreadcrumbEllipsisContext>(() => {
  const [start, end] = ellipsisRange.value
  return {
    items:
      hasEllipsis.value && start !== undefined && end !== undefined
        ? props.items.slice(start + 1, end + 1)
        : [],
  }
})

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(breadcrumbVariants({ variant: props.variant }), attrs.class),
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, undefined)
  return {
    ...ui,
    class: cn(breadcrumbListVariants({ variant: props.variant }), ui.class),
    style: ui.style,
  }
})

const ellipsisContainerProps = computed(() => {
  const ui = useUi(props.ui?.ellipsisContainer, undefined)
  return {
    'aria-label': t('more'),
    ...ui,
    class: cn('flex size-9 items-center justify-center', ui.class),
    style: ui.style,
  }
})

const separatorContainerProps = computed(() => {
  const ui = useUi(props.ui?.separatorContainer, undefined)
  return { role: 'presentation', 'aria-hidden': true, ...ui }
})

function getItemContext(item: BreadcrumbItem, index: number): BreadcrumbItemContext | undefined {
  const [start, end] = ellipsisRange.value
  if (
    hasEllipsis.value &&
    start !== undefined &&
    end !== undefined &&
    index > start &&
    index <= end
  ) {
    return undefined
  }

  const ellipsis = hasEllipsis.value && index === start
  return {
    item,
    index,
    first: index === 0,
    last: index === props.items.length - 1,
    linked: !ellipsis && item.to !== undefined,
    ellipsis,
  }
}

const itemContexts = computed(() =>
  props.items.flatMap((item, index) => {
    const context = getItemContext(item, index)
    return context ? [context] : []
  }),
)

function getKey(context: BreadcrumbItemContext) {
  return context.item.slot
}

function getSlotNames(context: BreadcrumbItemContext) {
  const key = getKey(context)
  return { item: `item-${key}` as const }
}

function getItemProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    class: cn('inline-flex items-center gap-1.5', ui.class),
    style: ui.style,
  }
}

function getLinkProps(context: BreadcrumbItemContext) {
  const { slot, ...linkProps } = context.item
  void slot
  return {
    ...linkProps,
    variant: 'plain' as const,
    color: 'neutral',
    'aria-current': context.last ? 'page' : undefined,
    class: cn(
      'h-auto px-2 py-0 has-[>svg]:px-2',
      context.linked
        ? 'text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:border-muted-foreground focus-visible:ring-0'
        : 'text-foreground',
    ),
  }
}
</script>

<template>
  <nav v-bind="rootProps" data-test-breadcrumb-root>
    <ol v-bind="listProps" data-test-breadcrumb-list>
      <template v-for="context in itemContexts" :key="getKey(context)">
        <li v-if="context.ellipsis" v-bind="ellipsisContainerProps" data-test-breadcrumb-ellipsis>
          <slot name="ellipsis" v-bind="ellipsisContext">
            <Icon v-if="props.ellipsisIcon" :name="props.ellipsisIcon" />
          </slot>
        </li>

        <li v-else v-bind="getItemProps(context)" :data-test-breadcrumb-item="context.item.slot">
          <slot :name="getSlotNames(context).item" v-bind="context">
            <slot name="item" v-bind="context">
              <Link
                v-bind="getLinkProps(context)"
                :data-test-breadcrumb-link="context.linked ? '' : undefined"
                :data-test-breadcrumb-page="context.linked ? undefined : ''"
              />
            </slot>
          </slot>
        </li>

        <template v-if="!context.last">
          <li v-bind="separatorContainerProps" data-test-breadcrumb-separator>
            <slot name="separator">
              <Icon v-if="props.separatorIcon" :name="props.separatorIcon" />
            </slot>
          </li>
        </template>
      </template>
    </ol>
  </nav>
</template>
