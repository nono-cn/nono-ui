<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['check', 'plus', 'star']
const icon = ref<IconName>('check')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'

const icon = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <Switch :model-value="true" :checked-icon="icon" aria-label="On" />
    <Switch :model-value="false" unchecked-icon="minus" aria-label="Off" />
  </div>
</template>`,
)

function reset() {
  icon.value = 'check'
}
</script>

<template>
  <ComponentExample
    title="Icons"
    description="Choose an icon name for each state."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4 [&_select]:w-36">
        <ExampleSelectControl v-model="icon" label="Checked icon" :options="icons" />
      </div>
    </template>
    <div class="flex items-center gap-4">
      <Switch :model-value="true" :checked-icon="icon" aria-label="On" />
      <Switch :model-value="false" unchecked-icon="minus" aria-label="Off" />
    </div>
  </ComponentExample>
</template>
