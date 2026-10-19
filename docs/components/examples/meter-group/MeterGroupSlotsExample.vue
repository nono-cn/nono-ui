<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import { MeterGroup, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'System', value: 9, color: 'neutral', slot: 'system' },
]
const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'System', value: 9, color: 'neutral', slot: 'system' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" status class="w-full max-w-md">
    <template #status="{ value, max }">{{ value }} GB of {{ max }} GB used</template>
    <template #trailing="{ value }">{{ value }} GB</template>
    <template #label-system="{ item }">
      {{ item.label }} <Badge label="Read only" size="sm" variant="soft" />
    </template>
  </MeterGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Customize the status and every legend part, or one item through its slot key."
    :code="code"
    :show-reset="false"
  >
    <MeterGroup :items="items" status class="w-full max-w-md">
      <template #status="{ value, max }">{{ value }} GB of {{ max }} GB used</template>
      <template #trailing="{ value }">{{ value }} GB</template>
      <template #label-system="{ item }">
        {{ item.label }} <Badge label="Read only" size="sm" variant="soft" />
      </template>
    </MeterGroup>
  </ComponentExample>
</template>
