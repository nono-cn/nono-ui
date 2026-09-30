<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import { IconTile } from '@/components/ui/IconTile'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['info', 'check', 'warning', 'error']
const icon = ref<IconName>('info')
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="${icon.value}" />
</template>`,
)

function reset() {
  icon.value = 'info'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon shown inside the tile."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <IconTile :icon="icon" />
  </ComponentExample>
</template>
