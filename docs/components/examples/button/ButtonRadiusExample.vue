<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref('full')
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button label="Save changes" radius="${radius.value}" />
    <Button icon="plus" square radius="${radius.value}" aria-label="Add item" />
    <Button label="12px radius" :radius="12" />
  </div>
</template>`,
)

function reset() {
  radius.value = 'full'
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Use a Tailwind radius token, a CSS value, or a number of pixels. Combine full with square for a circular button."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="radius" label="Radius" placeholder="md, full, 12px…" />
    </template>
    <div class="flex flex-wrap items-center gap-4">
      <Button label="Save changes" :radius="radius" />
      <Button icon="plus" square :radius="radius" aria-label="Add item" />
      <Button label="12px radius" :radius="12" />
    </div>
  </ComponentExample>
</template>
