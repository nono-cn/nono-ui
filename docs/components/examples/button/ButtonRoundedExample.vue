<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rounded = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button label="Save changes" :rounded="${rounded.value}" />
    <Button icon="plus" square :rounded="${rounded.value}" aria-label="Add item" />
    <Button label="Custom radius" :rounded="${rounded.value}" class="rounded-lg" />
  </div>
</template>`,
)

function reset() {
  rounded.value = true
}
</script>

<template>
  <ComponentExample
    title="Rounded"
    description="Use fully rounded corners, combine with square for a circular button, or override the radius with class."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex h-9 items-center gap-2 text-sm font-medium">
        <input v-model="rounded" type="checkbox" class="size-4 accent-primary" />
        Rounded
      </label>
    </template>
    <div class="flex flex-wrap items-center gap-4">
      <Button label="Save changes" :rounded="rounded" />
      <Button icon="plus" square :rounded="rounded" aria-label="Add item" />
      <Button label="Custom radius" :rounded="rounded" class="rounded-lg" />
    </div>
  </ComponentExample>
</template>
