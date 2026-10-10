<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tabs, type TabItem, type TabsUI } from '@/components/ui/Tabs'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'drafts', value: 'drafts', label: 'Drafts' },
  { slot: 'published', value: 'published', label: 'Published' },
]
const highlight = ref(true)
const panelFrame = ref(true)
const ui = computed<TabsUI>(() => ({
  list: () => ({ class: highlight.value ? 'ring-1 ring-primary/30' : '' }),
  trigger: ({ active }) => ({ class: active && highlight.value ? 'text-primary' : '' }),
  contentWrapper: () => ({ class: panelFrame.value ? 'rounded-md border border-border p-3' : '' }),
  content: ({ tab }) => ({ 'aria-label': `${tab.label} panel` }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Tabs, type TabsUI } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'drafts', value: 'drafts', label: 'Drafts' },
  { slot: 'published', value: 'published', label: 'Published' },
]
const ui: TabsUI = {
  list: () => ({ class: '${highlight.value ? 'ring-1 ring-primary/30' : ''}' }),
  trigger: ({ active }) => ({ class: active ? '${highlight.value ? 'text-primary' : ''}' : '' }),
  contentWrapper: () => ({ class: '${panelFrame.value ? 'rounded-md border border-border p-3' : ''}' }),
  content: ({ tab }) => ({ 'aria-label': \`\${tab.label} panel\` }),
}
${scriptEnd}

<template>
  <Tabs model-value="drafts" :tabs="tabs" :ui="ui" aria-label="Articles">
    <template #content-drafts><p>Unpublished articles.</p></template>
    <template #content-published><p>Published articles.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  highlight.value = true
  panelFrame.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the list, active trigger, panel wrapper, and content attributes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="highlight" label="Highlight selection" />
        <ExampleCheckboxControl v-model="panelFrame" label="Panel frame" />
      </div>
    </template>
    <div class="w-full max-w-xl">
      <Tabs model-value="drafts" :tabs="tabs" :ui="ui" aria-label="Articles">
        <template #content-drafts><p>Unpublished articles.</p></template>
        <template #content-published><p>Published articles.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
