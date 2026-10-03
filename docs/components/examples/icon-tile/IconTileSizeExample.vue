<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IconTile,
  iconTileDefaults,
  iconTileSizes,
  type IconTileSize,
} from '@/components/ui/IconTile'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<IconTileSize>(iconTileDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" size="${size.value}" />
</template>`,
)

function reset() {
  size.value = iconTileDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Scale the tile and icon together."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="iconTileSizes" />
      </div>
    </template>
    <IconTile icon="info" :size="size" />
  </ComponentExample>
</template>
