<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const color = ref('#dbeafe')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const color = ref('${color.value}')
${scriptEnd}

<template>
  <Avatar :color="color" severity="primary" label="JD" />
</template>`,
)

function reset() {
  color.value = '#dbeafe'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Set a custom background color for the avatar."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleColorControl v-model="color" label="Background color" />
    </template>
    <Avatar :color="color" severity="primary" label="JD" />
  </ComponentExample>
</template>
