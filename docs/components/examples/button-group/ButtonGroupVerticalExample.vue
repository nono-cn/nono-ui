<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  ButtonGroup,
  buttonGroupOrientations,
  type ButtonGroupOrientation,
} from '@/components/ui/ButtonGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientation = ref<ButtonGroupOrientation>('vertical')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup, type ButtonGroupOrientation } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'

const orientation = ref<ButtonGroupOrientation>('${orientation.value}')
${scriptEnd}

<template>
  <ButtonGroup :orientation="orientation" aria-label="Quick actions">
    <Button label="Edit" />
    <Button label="Duplicate" variant="outline" />
    <Button label="Delete" variant="outline" color="error" />
  </ButtonGroup>
</template>`,
)

function reset() {
  orientation.value = 'vertical'
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Choose a horizontal or vertical layout for the button group."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="buttonGroupOrientations"
        />
      </div>
    </template>
    <ButtonGroup :orientation="orientation" aria-label="Quick actions">
      <Button label="Edit" />
      <Button label="Duplicate" variant="outline" />
      <Button label="Delete" variant="outline" color="error" />
    </ButtonGroup>
  </ComponentExample>
</template>
