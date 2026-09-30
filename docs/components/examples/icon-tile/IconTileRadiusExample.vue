<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconTile, type IconTileRadius } from '@/components/ui/IconTile'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref<IconTileRadius>('sm')
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" radius="${radius.value}" />
  <IconTile icon="info" :radius="12" />
</template>`,
)

function reset() {
  radius.value = 'sm'
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Enter a Tailwind radius token or any CSS border-radius value. Numbers are pixels."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleTextInputControl v-model="radius" label="Radius" placeholder="sm, 12px, 1rem…" />
      </div>
    </template>
    <div class="flex items-center gap-4">
      <IconTile icon="info" :radius="radius" />
      <IconTile icon="info" :radius="12" />
    </div>
  </ComponentExample>
</template>
