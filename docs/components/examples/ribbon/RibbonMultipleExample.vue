<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import { Ribbon, type RibbonItem } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons: RibbonItem[] = [
  { label: 'New', position: 'top-right' },
  { label: '-20%', color: 'error', position: 'top-left' },
  { label: 'Limited', color: 'warning', position: 'bottom-right' },
]
const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Ribbon, type RibbonItem } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons: RibbonItem[] = [
  { label: 'New', position: 'top-right' },
  { label: '-20%', color: 'error', position: 'top-left' },
  { label: 'Limited', color: 'warning', position: 'bottom-right' },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
    <Card class="min-h-56 items-center justify-center text-center">
      <p class="font-semibold">Wireless headphones</p>
      <p class="text-sm text-muted-foreground">Noise cancelling, 30h battery.</p>
    </Card>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Multiple ribbons"
    description="Combine ribbons on different corners; later ribbons stack above earlier ones."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
      <Card class="min-h-56 items-center justify-center text-center">
        <p class="font-semibold">Wireless headphones</p>
        <p class="text-sm text-muted-foreground">Noise cancelling, 30h battery.</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
