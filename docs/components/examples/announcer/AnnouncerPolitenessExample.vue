<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Announcer,
  announcerDefaults,
  announcerPolitenessOptions,
  type AnnouncerPoliteness,
} from '@/components/ui/Announcer'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const politeness = ref<AnnouncerPoliteness>(announcerDefaults.politeness)
const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return 'none'
})
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer, type AnnouncerPoliteness } from '__DOCS_PACKAGE__/components/ui/Announcer'

const politeness = ref<AnnouncerPoliteness>('${politeness.value}')
${scriptEnd}

<template>
  <Announcer message="Your changes have been saved." :politeness="politeness" />
</template>`,
)

function reset() {
  politeness.value = announcerDefaults.politeness
}
</script>

<template>
  <ComponentExample
    title="Politeness"
    description="Choose how urgently the message is announced."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="politeness"
          label="Politeness"
          :options="announcerPolitenessOptions"
        />
      </div>
    </template>
    <div class="grid gap-2 text-sm">
      <Announcer message="Your changes have been saved." :politeness="politeness" />
      <p class="text-muted-foreground">
        <code>aria-live="{{ politeness }}"</code>
        <span aria-hidden="true"> · </span>
        <code>role="{{ role }}"</code>
      </p>
      <p class="text-xs text-muted-foreground">
        The announcement region is visually hidden; the values above describe its semantics.
      </p>
    </div>
  </ComponentExample>
</template>
