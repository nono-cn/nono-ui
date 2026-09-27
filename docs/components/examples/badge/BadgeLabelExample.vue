<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/Badge'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('Active')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Badge :label="label" />
</template>`,
)

function reset() {
  label.value = 'Active'
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Edit the text displayed inside the badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Label" placeholder="Badge label" />
      </div>
    </template>
    <Badge :label="label" />
  </ComponentExample>
</template>
