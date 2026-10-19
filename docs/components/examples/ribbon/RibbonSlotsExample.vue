<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Ribbon, type RibbonItem } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons: RibbonItem[] = [
  { label: 'Top rated', slot: 'rated', position: 'top-left', color: 'warning' },
  { label: 'New' },
]
const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
import { Ribbon, type RibbonItem } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons: RibbonItem[] = [
  { label: 'Top rated', slot: 'rated', position: 'top-left', color: 'warning' },
  { label: 'New' },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
    <template #label="{ item }">{{ item.label?.toUpperCase() }}</template>
    <template #label-rated="{ item }">
      <span class="inline-flex items-center gap-1"><Icon name="star" />{{ item.label }}</span>
    </template>
    <Card class="min-h-48 items-center justify-center text-center">
      <p class="font-semibold">Mechanical keyboard</p>
      <p class="text-sm text-muted-foreground">Hot-swappable switches.</p>
    </Card>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Customize every label, or one ribbon through its slot key."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
      <template #label="{ item }">{{ item.label?.toUpperCase() }}</template>
      <template #label-rated="{ item }">
        <span class="inline-flex items-center gap-1"><Icon name="star" />{{ item.label }}</span>
      </template>
      <Card class="min-h-48 items-center justify-center text-center">
        <p class="font-semibold">Mechanical keyboard</p>
        <p class="text-sm text-muted-foreground">Hot-swappable switches.</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
