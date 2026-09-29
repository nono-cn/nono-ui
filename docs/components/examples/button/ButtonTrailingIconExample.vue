<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['chevronRight', 'check', 'plus', 'save', 'user']
const trailingIcon = ref<IconName>('chevronRight')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const trailingIcon = ref('${trailingIcon.value}' as const)
${scriptEnd}

<template>
  <Button label="Next" :trailing-icon="trailingIcon" />
</template>`,
)

function reset() {
  trailingIcon.value = 'chevronRight'
}
</script>

<template>
  <ComponentExample
    title="Trailing icon"
    description="Choose the icon displayed after the button’s content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="trailingIcon" label="Trailing icon" :options="icons" />
      </div>
    </template>
    <Button label="Next" :trailing-icon="trailingIcon" />
  </ComponentExample>
</template>
