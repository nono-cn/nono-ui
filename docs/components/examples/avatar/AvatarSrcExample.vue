<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const src = ref('https://i.pravatar.cc/150?img=3')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const src = ref(${JSON.stringify(src.value)})
${scriptEnd}

<template>
  <Avatar :src="src" label="NC" alt="Example profile" />
</template>`,
)

function reset() {
  src.value = 'https://i.pravatar.cc/150?img=3'
}
</script>

<template>
  <ComponentExample
    title="Src"
    description="Set the URL of the profile image."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-lg">
        <ExampleTextInputControl v-model="src" label="Image source" placeholder="https://..." />
      </div>
    </template>
    <Avatar :src="src" label="NC" alt="Example profile" />
  </ComponentExample>
</template>
