<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, type AvatarShape } from '@/components/ui/Avatar'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const shapes: AvatarShape[] = ['rounded', 'square']
const shape = ref<AvatarShape>('rounded')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, type AvatarShape } from '__DOCS_PACKAGE__/components/ui/Avatar'

const shape = ref<AvatarShape>('${shape.value}')
${scriptEnd}

<template>
  <Avatar :shape="shape" label="JD" />
</template>`,
)

function reset() {
  shape.value = 'rounded'
}
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Choose the avatar shape."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="shape" label="Shape" :options="shapes" />
      </div>
    </template>
    <Avatar :shape="shape" label="JD" />
  </ComponentExample>
</template>
