<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const booleanOptions = ['true', 'false'] as const
const selectedRounded = ref<(typeof booleanOptions)[number]>('true')
const rounded = computed(() => selectedRounded.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const rounded = ref(${rounded.value})
${scriptEnd}

<template>
  <Button label="Save changes" :rounded="rounded" />
</template>`,
)

function reset() {
  selectedRounded.value = 'true'
}
</script>

<template>
  <ComponentExample
    title="Rounded"
    description="Toggle the button’s fully rounded shape."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedRounded" label="Rounded" :options="booleanOptions" />
      </div>
    </template>
    <Button label="Save changes" :rounded="rounded" />
  </ComponentExample>
</template>
