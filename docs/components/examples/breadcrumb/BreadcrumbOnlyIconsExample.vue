<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: (BreadcrumbItem & { 'aria-label': string })[] = [
  { slot: 'home', 'aria-label': 'Home', icon: 'folder', to: '/' },
  { slot: 'components', 'aria-label': 'Components', icon: 'folderOpen', to: '/components' },
  { slot: 'current', 'aria-label': 'Current page', icon: 'fileText' },
]

const code = `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'

const items: (BreadcrumbItem & { 'aria-label': string })[] = [
  { slot: 'home', 'aria-label': 'Home', icon: 'folder', to: '/' },
  { slot: 'components', 'aria-label': 'Components', icon: 'folderOpen', to: '/components' },
  { slot: 'current', 'aria-label': 'Current page', icon: 'fileText' },
]
${scriptEnd}

<template>
  <Breadcrumb :items="items" aria-label="Breadcrumb" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon-only items"
    description="Show only icons while keeping an accessible name for each item."
    :code="code"
    :show-reset="false"
  >
    <Breadcrumb :items="items" aria-label="Breadcrumb" />
  </ComponentExample>
</template>
