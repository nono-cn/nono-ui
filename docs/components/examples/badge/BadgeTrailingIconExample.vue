<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/Badge'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['chevronRight', 'externalLink', 'arrowUpRight', 'check']
const iconName = ref<IconName>('chevronRight')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'

const iconName = ref<IconName>('${iconName.value}')
${scriptEnd}

<template>
  <Badge label="Next" :trailing-icon="iconName" />
</template>`,
)

function reset() {
  iconName.value = 'chevronRight'
}
</script>

<template>
  <ComponentExample
    title="Trailing icon"
    description="Choose an icon displayed at the end of the badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="iconName" label="Trailing icon" :options="icons" />
      </div>
    </template>
    <Badge label="Next" :trailing-icon="iconName" />
  </ComponentExample>
</template>
