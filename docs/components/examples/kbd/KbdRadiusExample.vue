<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, kbdDefaults } from '@/components/ui/Kbd'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref<string>(kbdDefaults.radius)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'

const radius = ref(${JSON.stringify(radius.value)})
${scriptEnd}

<template>
  <Kbd label="Ctrl" :radius="radius" />
</template>`,
)

function reset() {
  radius.value = kbdDefaults.radius
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
    <Kbd label="Ctrl" :radius="radius" />
  </ComponentExample>
</template>
