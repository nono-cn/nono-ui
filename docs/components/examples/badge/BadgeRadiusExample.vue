<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, badgeDefaults } from '@/components/ui/Badge'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref<string>(badgeDefaults.radius)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'

const radius = ref(${JSON.stringify(radius.value)})
${scriptEnd}

<template>
  <Badge label="Active" :radius="radius" />
</template>`,
)

function reset() {
  radius.value = badgeDefaults.radius
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Use a Tailwind radius token, a CSS value, or a number of pixels."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="radius" label="Radius" placeholder="md, full, 12px…" />
    </template>
    <Badge label="Active" :radius="radius" />
  </ComponentExample>
</template>
