<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'docs', label: 'Docs', to: '/components' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
const code = `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'docs', label: 'Docs', to: '/components' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
${scriptEnd}

<template>
  <Breadcrumb :items="items" :ellipsis-index="[1, 2]" aria-label="Breadcrumb">
    <template #ellipsis="{ items: hiddenItems }">
      <span :aria-label="hiddenItems.length + ' hidden levels'">+{{ hiddenItems.length }}</span>
    </template>
    <template #separator><span aria-hidden="true">/</span></template>
    <template #item="{ item, linked, last }">
      <Link :to="item.to" :label="item.label" variant="plain" color="neutral"
        :aria-current="last ? 'page' : undefined"
        :class="linked ? 'text-muted-foreground hover:bg-transparent hover:text-foreground' : 'text-foreground'" />
    </template>
    <template #item-home="{ item, last }">
      <Link :to="item.to" :label="item.label" icon="home" variant="plain" color="neutral"
        :aria-current="last ? 'page' : undefined"
        class="text-muted-foreground hover:bg-transparent hover:text-foreground" />
    </template>
  </Breadcrumb>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom slots"
    description="Replace ellipsis, separator, and item content; item-home takes precedence over the generic item slot."
    :code="code"
    :show-reset="false"
  >
    <Breadcrumb :items="items" :ellipsis-index="[1, 2]" aria-label="Breadcrumb">
      <template #ellipsis="{ items: hiddenItems }">
        <span :aria-label="hiddenItems.length + ' hidden levels'">+{{ hiddenItems.length }}</span>
      </template>
      <template #separator><span aria-hidden="true">/</span></template>
      <template #item="{ item, linked, last }">
        <Link
          :to="item.to"
          :label="item.label"
          variant="plain"
          color="neutral"
          :aria-current="last ? 'page' : undefined"
          :class="
            linked
              ? 'text-muted-foreground hover:bg-transparent hover:text-foreground'
              : 'text-foreground'
          "
        />
      </template>
      <template #item-home="{ item, last }">
        <Link
          :to="item.to"
          :label="item.label"
          icon="home"
          variant="plain"
          color="neutral"
          :aria-current="last ? 'page' : undefined"
          class="text-muted-foreground hover:bg-transparent hover:text-foreground"
        />
      </template>
    </Breadcrumb>
  </ComponentExample>
</template>
