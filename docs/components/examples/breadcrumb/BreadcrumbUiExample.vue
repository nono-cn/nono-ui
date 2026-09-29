<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem, type BreadcrumbUI } from '@/components/ui/Breadcrumb'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'visits', label: 'Visits', to: '/visits', size: 'xs' },
  { slot: 'visit-form', label: 'Visit form', size: 'xs' },
]
const ui: BreadcrumbUI = {
  list: () => ({ class: 'w-full rounded-sm bg-muted px-2 py-2' }),
  separatorContainer: () => ({ class: 'px-0.5 text-muted-foreground' }),
}
const code = `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem, type BreadcrumbUI } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'

const items: BreadcrumbItem[] = [
  { slot: 'visits', label: 'Visits', to: '/visits', size: 'xs' },
  { slot: 'visit-form', label: 'Visit form', size: 'xs' },
]
const ui: BreadcrumbUI = {
  list: () => ({ class: 'w-full rounded-sm bg-muted px-2 py-2' }),
  separatorContainer: () => ({ class: 'px-0.5 text-muted-foreground' }),
}
${scriptEnd}

<template>
  <Breadcrumb :items="items" :ui="ui" class="w-full border-0 p-0" aria-label="Breadcrumb">
    <template #separator>/</template>
  </Breadcrumb>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Create a full-width muted breadcrumb bar with a slash separator."
    :code="code"
    :show-reset="false"
  >
    <Breadcrumb :items="items" :ui="ui" class="w-full border-0 p-0" aria-label="Breadcrumb">
      <template #separator>/</template>
    </Breadcrumb>
  </ComponentExample>
</template>
