<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components/Icon'
import type { IconName } from '@/components/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const names: IconName[] = ['check', 'info', 'warning', 'error']
const name = ref<IconName>('check')
const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/Icon'
${scriptEnd}

<template>
  <Icon name="${name.value}" />
</template>`,
)

function reset() {
  name.value = 'check'
}
</script>

<template>
  <ComponentExample
    title="Name"
    description="Choose a registered icon name."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="name" label="Name" :options="names" />
      </div>
    </template>
    <Icon :name="name" />
  </ComponentExample>
</template>
