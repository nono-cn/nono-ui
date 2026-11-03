<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer, announcerDefaults } from '@/components/Announcer'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const booleanOptions = ['true', 'false'] as const
const initialVisible: (typeof booleanOptions)[number] = announcerDefaults.visible ? 'true' : 'false'
const selectedVisible = ref<(typeof booleanOptions)[number]>(initialVisible)
const visible = computed(() => selectedVisible.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '__DOCS_PACKAGE__/components/Announcer'

const visible = ref(${visible.value})
${scriptEnd}

<template>
  <Announcer message="Your changes have been saved." :visible="visible" />
</template>`,
)

function reset() {
  selectedVisible.value = initialVisible
}
</script>

<template>
  <ComponentExample
    title="Visible"
    description="Show the region on the page while it keeps announcing its content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedVisible" label="Visible" :options="booleanOptions" />
      </div>
    </template>
    <Announcer message="Your changes have been saved." :visible="visible" />
  </ComponentExample>
</template>
