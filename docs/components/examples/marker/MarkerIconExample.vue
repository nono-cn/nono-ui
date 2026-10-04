<script setup lang="ts">
import { computed, ref } from 'vue'
import { Marker } from '@/components/ui/Marker'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['check', 'info', 'warning', 'star']
const icon = ref<IconName>('check')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'

const icon = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <Marker label="Sync complete" :icon="icon" />
</template>`,
)

function reset() {
  icon.value = 'check'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose a decorative icon displayed before the message."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <Marker label="Sync complete" :icon="icon" />
  </ComponentExample>
</template>
