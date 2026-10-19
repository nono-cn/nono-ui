<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/Card'
import { Ribbon, type RibbonItem, type RibbonUI } from '@/components/ui/Ribbon'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons: RibbonItem[] = [{ label: 'Beta' }]
const thinBand = ref(true)
const italicLabel = ref(true)
const dimContent = ref(false)
const ui = computed<RibbonUI>(() => ({
  band: () => ({ class: thinBand.value ? 'h-6 shadow-none' : '' }),
  label: () => ({ class: italicLabel.value ? 'italic' : '' }),
  content: () => ({ class: dimContent.value ? 'opacity-60' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Ribbon, type RibbonUI } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [{ label: 'Beta' }]
const ui: RibbonUI = {
  band: () => ({ class: '${thinBand.value ? 'h-6 shadow-none' : ''}' }),
  label: () => ({ class: '${italicLabel.value ? 'italic' : ''}' }),
  content: () => ({ class: '${dimContent.value ? 'opacity-60' : ''}' }),
}
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" :ui="ui" class="w-72 rounded-xl">
    <Card label="Insights" description="Early access feature." class="min-h-48">
      <p class="text-sm">Weekly usage reports.</p>
    </Card>
  </Ribbon>
</template>`,
)

function reset() {
  thinBand.value = true
  italicLabel.value = true
  dimContent.value = false
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the band, label, and content wrapper attributes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="thinBand" label="Thin band" />
        <ExampleCheckboxControl v-model="italicLabel" label="Italic label" />
        <ExampleCheckboxControl v-model="dimContent" label="Dim content" />
      </div>
    </template>
    <Ribbon :ribbons="ribbons" :ui="ui" class="w-72 rounded-xl">
      <Card label="Insights" description="Early access feature." class="min-h-48">
        <p class="text-sm">Weekly usage reports.</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
