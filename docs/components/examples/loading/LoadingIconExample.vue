<script setup lang="ts">
import { computed, ref } from 'vue'
import { Loading, loadingDefaults } from '@/components/ui/Loading'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['spinner', 'star', 'search']
const icon = ref<IconName>(loadingDefaults.icon)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'

const icon = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <Loading :icon="icon" aria-label="Loading users" />
</template>`,
)

function reset() {
  icon.value = loadingDefaults.icon
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon name used as the loading indicator."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <Loading :icon="icon" aria-label="Loading users" />
  </ComponentExample>
</template>
