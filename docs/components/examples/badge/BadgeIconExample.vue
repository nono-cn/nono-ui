<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/Badge'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['check', 'info', 'warning', 'star', 'user']
const iconName = ref<IconName>('check')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'

const iconName = ref<IconName>('${iconName.value}')
${scriptEnd}

<template>
  <Badge label="Verified" :icon="{ name: iconName }" />
</template>`,
)

function reset() {
  iconName.value = 'check'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose a leading icon for the badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="iconName" label="Icon" :options="icons" />
      </div>
    </template>
    <Badge label="Verified" :icon="{ name: iconName }" />
  </ComponentExample>
</template>
