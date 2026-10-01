<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, avatarDefaults } from '@/components/ui/Avatar'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref<string>(avatarDefaults.radius)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const radius = ref(${JSON.stringify(radius.value)})
${scriptEnd}

<template>
  <Avatar :radius="radius" label="JD" />
</template>`,
)

function reset() {
  radius.value = avatarDefaults.radius
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Use a Tailwind radius token, a CSS value, or a number of pixels. Full creates the default circular avatar."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="radius" label="Radius" placeholder="full, md, 12px…" />
    </template>
    <Avatar :radius="radius" label="JD" />
  </ComponentExample>
</template>
