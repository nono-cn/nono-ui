<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, type BubbleUI } from '@/components/ui/Bubble'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const italicSurface = ref(true)
const outlinedReactions = ref(true)
const ui = computed<BubbleUI>(() => ({
  surface: () => ({ class: italicSurface.value ? 'italic' : '' }),
  reactions: () => ({ class: outlinedReactions.value ? 'border shadow-none' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Bubble, type BubbleUI } from '__DOCS_PACKAGE__/components/ui/Bubble'

const ui: BubbleUI = {
  surface: () => ({ class: '${italicSurface.value ? 'italic' : ''}' }),
  reactions: () => ({ class: '${outlinedReactions.value ? 'border shadow-none' : ''}' }),
}
${scriptEnd}

<template>
  <Bubble :ui="ui">
    Message with custom parts
    <template #reactions>
      <span role="img" aria-label="Like">👍</span>
    </template>
  </Bubble>
</template>`,
)

function reset() {
  italicSurface.value = true
  outlinedReactions.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the surface and reactions attributes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="italicSurface" label="Italic surface" />
        <ExampleCheckboxControl v-model="outlinedReactions" label="Outlined reactions" />
      </div>
    </template>
    <Bubble :ui="ui">
      Message with custom parts
      <template #reactions>
        <span role="img" aria-label="Like">👍</span>
      </template>
    </Bubble>
  </ComponentExample>
</template>
