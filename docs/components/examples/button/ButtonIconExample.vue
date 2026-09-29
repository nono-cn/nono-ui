<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['save', 'check', 'plus', 'search', 'user']
const icon = ref<IconName>('save')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const icon = ref('${icon.value}' as const)
${scriptEnd}

<template>
  <Button label="Save changes" :icon="icon" />
</template>`,
)

function reset() {
  icon.value = 'save'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon displayed before the button’s content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <Button label="Save changes" :icon="icon" />
  </ComponentExample>
</template>
