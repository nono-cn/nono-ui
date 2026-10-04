<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toggle } from '@/components/ui/Toggle'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['star', 'check', 'plus']
const icon = ref<IconName>('star')
const code = computed(
  () => `<script setup lang="ts">
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'
${scriptEnd}

<template>
  <Toggle :model-value="true" icon="${icon.value}" trailing-icon="check" label="Favorite" aria-label="Toggle favorite" />
</template>`,
)

function reset() {
  icon.value = 'star'
}
</script>

<template>
  <ComponentExample
    title="Icons"
    description="Choose icon names to show before and after the label."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Leading icon" :options="icons" />
      </div>
    </template>
    <Toggle
      :model-value="true"
      :icon="icon"
      trailing-icon="check"
      label="Favorite"
      aria-label="Toggle favorite"
    />
  </ComponentExample>
</template>
