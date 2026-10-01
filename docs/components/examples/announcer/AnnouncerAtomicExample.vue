<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer, announcerDefaults } from '@/components/ui/Announcer'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const booleanOptions = ['true', 'false'] as const
const initialAtomic: (typeof booleanOptions)[number] = announcerDefaults.atomic ? 'true' : 'false'
const selectedAtomic = ref<(typeof booleanOptions)[number]>(initialAtomic)
const atomic = computed(() => selectedAtomic.value === 'true')
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
  selectedAtomic.value = initialAtomic
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
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedAtomic" label="Atomic" :options="booleanOptions" />
      </div>
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
