<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IconTile,
  iconTileDefaults,
  iconTileVariantNames,
  type IconTileVariant,
} from '@/components/ui/IconTile'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<IconTileVariant>(iconTileDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" variant="${variant.value}" />
</template>`,
)

function reset() {
  variant.value = iconTileDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose an outline, elevated, soft, solid, or framed surface."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="iconTileVariantNames" />
      </div>
    </template>
    <IconTile icon="info" :variant="variant" />
  </ComponentExample>
</template>
