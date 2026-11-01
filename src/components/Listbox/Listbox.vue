<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ListboxContent,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxRoot,
  ListboxFilter,
  ListboxVirtualizer,
} from 'reka-ui'
import { Input } from '@/components/Input'
import { Icon } from '@/components/Icon'
import { useUi } from '@/composables/useUi'
import { useFilter } from '@/composables/useFilter'
import { useColor } from '@/composables/useColor'
import { cn } from '@/lib/utils'
import ListboxOption from './ListboxOption.vue'
import { listboxDefaults } from './defaults'
import type {
  ListboxContext,
  ListboxGroupContext,
  ListboxItemContext,
  ListboxItem,
  ListboxProps,
  ListboxSlots,
  ListboxEmits,
} from '.'
import { listboxVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ListboxProps>(), listboxDefaults)
defineSlots<ListboxSlots>()
const emit = defineEmits<ListboxEmits>()
const attrs = useAttrs()
const { t } = useI18n()
const value = defineModel<ListboxProps['value']>('value')
const search = defineModel<string>('search', { default: '' })
const { colorStyle } = useColor(() => props.color, 'listbox')

const listboxContext = computed<ListboxContext>(() => {
  return { value: value.value, search: search.value }
})

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, listboxContext.value)

  return {
    ...ui,
    disabled: props.disabled,
    highlightOnHover: props.highlightOnHover,
    multiple: props.multiple,
    name: props.name,
    orientation: props.orientation,
    required: props.required,
    selectionBehavior: props.selectionBehavior,
    class: cn(
      'min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-[color,box-shadow]',
      (attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true') &&
        'border-destructive ring-3 ring-destructive/20 focus-within:border-destructive focus-within:ring-destructive/20 dark:ring-destructive/40 dark:focus-within:ring-destructive/40',
      listboxVariants({ size: props.size, severity: props.severity, color: Boolean(props.color) }),
      attrs.class,
      ui.class,
    ),
    style: [colorStyle.value, attrs.style, ui.style],
  }
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, listboxContext.value)

  return {
    ...attrs,
    ...ui,
    class: cn(
      props.filter && 'border-t',
      props.virtualize && 'max-h-80 overflow-auto',
      'outline-none',
      attrs.class,
      ui.class,
    ),
    style: [attrs.style, ui.style],
  }
})

const filterProps = computed(() => {
  return {
    ...props.inputFilter,
    variant: props.inputFilter?.variant ?? 'none',
    severity: props.inputFilter?.severity ?? props.severity,
    color: props.inputFilter?.color ?? props.color,
    placeholder: props.inputFilter?.placeholder ?? t('searchPlaceholder'),
    size: props.inputFilter?.size ?? props.size,
    disabled: props.disabled || props.inputFilter?.disabled,
    class: cn('m-0', props.inputFilter?.class),
    style: props.inputFilter?.style,
  }
})

const { filter, normalized } = useFilter<ListboxItem>({
  mode: props.filterConfig?.mode,
  sensitivity: props.filterConfig?.sensitivity,
  getText: (item) => item.label,
})

const normalizedSearch = computed(() => normalized(search.value))

function filterItems(items: ListboxItemContext['item'][]) {
  if (!props.filter || props.ignoreFilter || !normalizedSearch.value) return items

  return filter(items, search.value)
}

const itemContexts = computed<ListboxItemContext[]>(() =>
  filterItems(props.items).map((item, index) => ({
    item,
    index,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  })),
)

const groupContexts = computed<ListboxGroupContext[]>(() =>
  props.groups
    .map((group) => ({ ...group, items: filterItems(group.items) }))
    .filter((group) => group.items.length)
    .map((group, index) => ({
      group,
      index,
    })),
)

const usesGroups = computed(() => props.groups.length > 0)
const hasRecords = computed(() =>
  usesGroups.value ? props.groups.some((group) => group.items.length > 0) : props.items.length > 0,
)
const hasVisibleRecords = computed(() =>
  usesGroups.value ? groupContexts.value.length > 0 : itemContexts.value.length > 0,
)
const showEmpty = computed(() => !hasRecords.value)
const showNoResults = computed(
  () =>
    props.filter && Boolean(normalizedSearch.value) && hasRecords.value && !hasVisibleRecords.value,
)

const emptyProps = computed(() => {
  const ui = useUi(props.ui?.empty, listboxContext.value)
  return {
    role: 'status',
    'aria-live': 'polite',
    ...ui,
    class: cn(
      'px-2 py-6 text-center text-sm text-muted-foreground',
      listboxVariants({ size: props.size }),
      ui.class,
    ),
    style: ui.style,
  }
})

const noResultsProps = computed(() => {
  const ui = useUi(props.ui?.noResults, listboxContext.value)
  return {
    role: 'status',
    'aria-live': 'polite',
    ...ui,
    class: cn(
      'px-2 py-6 text-center text-sm text-muted-foreground',
      listboxVariants({ size: props.size }),
      ui.class,
    ),
    style: ui.style,
  }
})

const loadingProps = computed(() => {
  const ui = useUi(props.ui?.loading, listboxContext.value)
  return {
    ...ui,
    role: 'status',
    'aria-live': 'polite',
    class: cn(
      'grid place-items-center px-2 py-6 text-sm text-muted-foreground',
      listboxVariants({ size: props.size }),
      ui.class,
    ),
    style: ui.style,
  }
})

function getGroupItemContexts(context: ListboxGroupContext): ListboxItemContext[] {
  return context.group.items.map((item, index) => ({
    item,
    index,
    group: context.group,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  }))
}

function getGroupProps(context: ListboxGroupContext) {
  const ui = useUi(props.ui?.group, context)
  return {
    ...ui,
    class: cn('py-1 first:pt-0 last:pb-0 [&:not(:first-child)]:border-t', ui.class),
    style: ui.style,
  }
}

function getGroupLabelProps(context: ListboxGroupContext) {
  const ui = useUi(props.ui?.groupLabel, context)
  return {
    ...ui,
    class: cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', ui.class),
    style: ui.style,
  }
}
</script>

<template>
  <ListboxRoot
    v-model="value"
    v-bind="rootProps"
    data-test-listbox-root
    @entry-focus="emit('entryFocus', $event)"
    @highlight="emit('highlight', $event)"
    @leave="emit('leave', $event)"
  >
    <ListboxFilter v-if="props.filter" v-model:value="search" as-child>
      <Input v-bind="filterProps" data-test-listbox-filter>
        <template v-if="props.iconFilter || $slots['filter-leading']" #leading>
          <div data-test-listbox-filter-leading>
            <slot name="filter-leading" v-bind="listboxContext">
              <Icon v-bind="props.iconFilter" data-test-listbox-icon-filter />
            </slot>
          </div>
        </template>
      </Input>
    </ListboxFilter>

    <ListboxContent v-bind="contentProps" data-test-listbox-content>
      <div v-if="props.loading" v-bind="loadingProps" data-test-listbox-loading>
        <slot name="loading" v-bind="listboxContext">
          <Icon
            name="spinner"
            class="animate-spin"
            aria-hidden="true"
            data-test-listbox-loading-icon
          />
        </slot>
      </div>

      <div v-else-if="showEmpty" v-bind="emptyProps" data-test-listbox-empty>
        <slot name="empty" v-bind="listboxContext">
          {{ props.emptyText ?? t('empty') }}
        </slot>
      </div>

      <div v-else-if="showNoResults" v-bind="noResultsProps" data-test-listbox-no-results>
        <slot name="no-results" v-bind="listboxContext">
          {{ props.noResultsText ?? t('noResults') }}
        </slot>
      </div>

      <template v-else>
        <template v-if="usesGroups">
          <ListboxGroup
            v-for="groupContext in groupContexts"
            :key="groupContext.group.id"
            v-bind="getGroupProps(groupContext)"
            data-test-listbox-group
          >
            <ListboxGroupLabel
              v-if="groupContext.group.label"
              v-bind="getGroupLabelProps(groupContext)"
              data-test-listbox-group-label
            >
              <slot name="group-label" v-bind="groupContext">
                {{ groupContext.group.label }}
              </slot>
            </ListboxGroupLabel>
            <ListboxOption
              v-for="itemContext in getGroupItemContexts(groupContext)"
              :key="itemContext.item.id ?? String(itemContext.item.value)"
              :context="itemContext"
              :ui="props.ui"
              :size="props.size"
              @select="emit('select', $event)"
            >
              <template v-for="(_, name) in $slots" #[name]="slotProps">
                <slot :name="name" v-bind="slotProps" />
              </template>
            </ListboxOption>
          </ListboxGroup>
        </template>

        <ListboxVirtualizer
          v-else-if="props.virtualize"
          v-slot="{ option }"
          :options="itemContexts"
          :estimate-size="props.virtualizerConfig?.estimateSize ?? 32"
          :overscan="props.virtualizerConfig?.overscan ?? 12"
          :text-content="(option) => option.item.label"
        >
          <ListboxOption
            :context="option"
            :ui="props.ui"
            :size="props.size"
            @select="emit('select', $event)"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </ListboxOption>
        </ListboxVirtualizer>

        <template v-else>
          <ListboxOption
            v-for="itemContext in itemContexts"
            :key="itemContext.item.id ?? String(itemContext.item.value)"
            :context="itemContext"
            :ui="props.ui"
            :size="props.size"
            @select="emit('select', $event)"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </ListboxOption>
        </template>
      </template>
    </ListboxContent>
  </ListboxRoot>
</template>
