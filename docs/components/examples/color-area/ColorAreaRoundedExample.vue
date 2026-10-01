<script setup lang="ts">
import { computed, ref } from 'vue'
import { ColorArea, colorAreaDefaults } from '@/components/ui/ColorArea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const roundedOptions = ['true', 'false'] as const
const selectedRounded = ref(String(colorAreaDefaults.rounded))
const rounded = computed(() => selectedRounded.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const rounded = ref(${rounded.value})
${scriptEnd}

<template>
  <ColorArea :rounded="rounded" />
</template>`,
)

function reset() {
  selectedRounded.value = String(colorAreaDefaults.rounded)
}
</script>

<template>
  <ComponentExample
    title="Rounded"
    description="Choose between rounded corners and square corners."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedRounded" label="Rounded" :options="roundedOptions" />
      </div>
    </template>
    <div class="grid justify-items-center gap-2">
      <ColorArea :rounded="rounded" />
      <span class="text-sm">{{ rounded ? 'Rounded' : 'Square' }}</span>
    </div>
  </ComponentExample>
</template>
