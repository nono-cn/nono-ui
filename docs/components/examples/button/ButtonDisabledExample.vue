<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const booleanOptions = ['true', 'false'] as const
const selectedDisabled = ref<(typeof booleanOptions)[number]>('true')
const disabled = computed(() => selectedDisabled.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const disabled = ref(${disabled.value})
${scriptEnd}

<template>
  <Button label="Save changes" :disabled="disabled" />
</template>`,
)

function reset() {
  selectedDisabled.value = 'true'
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Toggle whether the button accepts interaction."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="selectedDisabled"
          label="Disabled"
          :options="booleanOptions"
        />
      </div>
    </template>
    <Button label="Save changes" :disabled="disabled" />
  </ComponentExample>
</template>
