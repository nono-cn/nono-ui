<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch, switchDefaults, switchSizes, type SwitchSize } from '@/components/ui/Switch'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<SwitchSize>(switchDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch, type SwitchSize } from '__DOCS_PACKAGE__/components/ui/Switch'

const size = ref<SwitchSize>('${size.value}')
${scriptEnd}

<template>
  <Switch :size="size" :model-value="true" aria-label="Enabled" />
</template>`,
)

function reset() {
  size.value = switchDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the size of the track and thumb."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4 [&_select]:w-36">
        <ExampleSelectControl v-model="size" label="Size" :options="switchSizes" />
      </div>
    </template>
    <Switch :size="size" :model-value="true" aria-label="Enabled" />
  </ComponentExample>
</template>
