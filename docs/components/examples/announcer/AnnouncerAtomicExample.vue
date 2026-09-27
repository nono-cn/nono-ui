<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@/components/ui/Announcer'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const atomic = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'

const atomic = ref(${atomic.value})
${scriptEnd}

<template>
  <Announcer message="Upload complete." :atomic="atomic" />
</template>`,
)

function reset() {
  atomic.value = true
}
</script>

<template>
  <ComponentExample
    title="Atomic announcements"
    description="Choose whether assistive technology announces the entire region when it changes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="atomic" label="Announce the entire region" />
    </template>
    <div class="grid gap-2 text-sm">
      <Announcer message="Upload complete." :atomic="atomic" />
      <p class="text-muted-foreground">
        <code>aria-atomic="{{ atomic }}"</code>
      </p>
      <p class="text-xs text-muted-foreground">The live region is visually hidden.</p>
    </div>
  </ComponentExample>
</template>
