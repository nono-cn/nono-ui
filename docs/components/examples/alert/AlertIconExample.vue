<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['check', 'info', 'warning', 'error', 'success', 'save', 'search', 'user']
const icon = ref<IconName>('check')

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const icon = ref('${icon.value}' as const)
${scriptEnd}

<template>
  <Alert
    label="Sync complete"
    description="All changes are up to date."
    :icon="icon"
    severity="success"
  />
</template>`,
)

function reset() {
  icon.value = 'check'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the leading icon displayed in the alert."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert
        label="Sync complete"
        description="All changes are up to date."
        :icon="icon"
        severity="success"
      />
    </div>
  </ComponentExample>
</template>
