<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, ratingDefaults } from '@/components/ui/Rating'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons = ['star', 'heart'] as const
const icon = ref<IconName>(ratingDefaults.icon)
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" icon="${icon.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  icon.value = ratingDefaults.icon
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon shown in each rating item."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="icon" label="Icon" :options="icons"
    /></template>
    <Rating :model-value="3" :icon="icon" aria-label="Product rating" />
  </ComponentExample>
</template>
