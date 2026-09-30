<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconTile, iconTileShapes, type IconTileShape } from '@/components/ui/IconTile'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const shape = ref<IconTileShape>('rounded')
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" shape="${shape.value}" />
</template>`,
)

function reset() {
  shape.value = 'rounded'
}
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Choose a rounded square or circle."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="shape" label="Shape" :options="iconTileShapes" />
      </div>
    </template>
    <IconTile icon="info" :shape="shape" />
  </ComponentExample>
</template>
