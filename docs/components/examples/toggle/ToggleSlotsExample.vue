<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toggle } from '@/components/ui/Toggle'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const pressed = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'

const pressed = ref(${pressed.value})
${scriptEnd}

<template>
  <Toggle v-model="pressed" aria-label="Toggle bookmark">
    <template #leading="context">{{ context.pressed ? '★' : '☆' }}</template>
    <template #default="context">{{ context.pressed ? 'Saved' : 'Save' }}</template>
    <template #trailing="context">{{ context.pressed ? 'On' : 'Off' }}</template>
  </Toggle>
</template>`,
)

function reset() {
  pressed.value = false
}
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Use slot context to customize content for each state."
    :code="code"
    @reset="reset"
  >
    <Toggle v-model="pressed" aria-label="Toggle bookmark">
      <template #leading="context">{{ context.pressed ? '★' : '☆' }}</template>
      <template #default="context">{{ context.pressed ? 'Saved' : 'Save' }}</template>
      <template #trailing="context">{{ context.pressed ? 'On' : 'Off' }}</template>
    </Toggle>
  </ComponentExample>
</template>
