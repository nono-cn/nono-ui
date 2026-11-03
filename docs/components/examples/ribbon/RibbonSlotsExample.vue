<script setup lang="ts">
import { Card } from '@/components/Card'
import { Icon } from '@/components/Icon'
import { Ribbon, type RibbonItem } from '@/components/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons: RibbonItem[] = [
  { label: 'Top rated', position: 'top-left', color: 'warning' },
  { label: 'New' },
]
const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/Card'
import { Icon } from '__DOCS_PACKAGE__/components/Icon'
import { Ribbon, type RibbonItem } from '__DOCS_PACKAGE__/components/Ribbon'

const ribbons: RibbonItem[] = [
  { label: 'Top rated', position: 'top-left', color: 'warning' },
  { label: 'New' },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
    <template #label="{ item }">
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
    description="Customize the label of every ribbon through the label slot."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
      <template #label="{ item }">
        <span class="inline-flex items-center gap-1"><Icon name="star" />{{ item.label }}</span>
      </template>
      <Card class="min-h-48 items-center justify-center text-center">
        <p class="font-semibold">Mechanical keyboard</p>
        <p class="text-sm text-muted-foreground">Hot-swappable switches.</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
