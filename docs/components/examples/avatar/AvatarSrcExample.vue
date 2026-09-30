<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const src = ref('https://i.pravatar.cc/150?img=3')
const alt = ref('Example profile')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const src = ref(${JSON.stringify(src.value)})
const alt = ref(${JSON.stringify(alt.value)})
${scriptEnd}

<template>
  <Avatar :src="src" :alt="alt" label="NC" />
</template>`,
)

function reset() {
  src.value = 'https://i.pravatar.cc/150?img=3'
  alt.value = 'Example profile'
}
</script>

<template>
  <ComponentExample
    title="Src"
    description="Set the image URL and its alternative text."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full max-w-lg gap-4">
        <ExampleTextInputControl v-model="src" label="Image source" placeholder="https://..." />
        <ExampleTextInputControl
          v-model="alt"
          label="Alternative text"
          placeholder="Profile name"
        />
      </div>
    </template>
    <Avatar :src="src" :alt="alt" label="NC" />
  </ComponentExample>
</template>
