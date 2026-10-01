<script setup lang="ts">
import { computed, ref } from 'vue'
import { ColorArea } from '@/components/ui/ColorArea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disabledOptions = ['true', 'false'] as const
const selectedDisabled = ref('true')
const disabled = computed(() => selectedDisabled.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const disabled = ref(${disabled.value})
${scriptEnd}

<template>
  <ColorArea :disabled="disabled" />
</template>`,
)

function reset() {
  selectedDisabled.value = 'true'
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Choose whether interaction with the color area is disabled."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="selectedDisabled"
          label="Disabled"
          :options="disabledOptions"
        />
      </div>
    </template>
    <ColorArea :disabled="disabled" />
  </ComponentExample>
</template>
