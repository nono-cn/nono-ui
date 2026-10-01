<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  ButtonGroup,
  buttonGroupDefaults,
  buttonGroupSizes,
  type ButtonGroupSize,
} from '@/components/ui/ButtonGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ButtonGroupSize>(buttonGroupDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup, type ButtonGroupSize } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'

const size = ref<ButtonGroupSize>('${size.value}')
${scriptEnd}

<template>
  <ButtonGroup :size="size" aria-label="Document actions">
    <Button label="Cancel" variant="outline" icon="x" />
    <Button label="Apply" icon="check" />
  </ButtonGroup>
</template>`,
)

function reset() {
  size.value = buttonGroupDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Provides a default size to the buttons in the group."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="buttonGroupSizes" />
      </div>
    </template>
    <ButtonGroup :size="size" aria-label="Document actions">
      <Button label="Cancel" variant="outline" icon="x" />
      <Button label="Apply" icon="check" />
    </ButtonGroup>
  </ComponentExample>
</template>
