<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['star', 'heart']
const icon = ref<IconName>('heart')
const rating = ref(3)

function reset() {
  icon.value = 'heart'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" icon="${icon.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Use another icon instead of the star."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="icon"
        label="Icon"
        :options="icons"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :icon="icon" aria-label="Rating" />
  </ComponentExample>
</template>
