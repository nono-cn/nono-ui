<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('JD')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Avatar :label="label" />
</template>`,
)

function reset() {
  label.value = 'JD'
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Set the text shown in the avatar fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Label" placeholder="JD" />
      </div>
    </template>
    <Avatar :label="label" />
  </ComponentExample>
</template>
