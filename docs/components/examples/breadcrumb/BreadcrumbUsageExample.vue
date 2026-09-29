<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', icon: 'folder', to: '/' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]

const code = `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', icon: 'folder', to: '/' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
${scriptEnd}

<template>
  <Breadcrumb :items="items" aria-label="Breadcrumb" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Navigate a hierarchy with a current-page item."
    :code="code"
    :show-reset="false"
  >
    <Breadcrumb :items="items" aria-label="Breadcrumb" />
  </ComponentExample>
</template>
