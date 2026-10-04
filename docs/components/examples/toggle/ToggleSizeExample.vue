<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toggle, toggleDefaults, toggleSizes, type ToggleSize } from '@/components/ui/Toggle'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ToggleSize>(toggleDefaults.size)
const isIconSize = computed(() => size.value.startsWith('icon'))
const code = computed(
  () => `<script setup lang="ts">
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'
${scriptEnd}

<template>
  <Toggle size="${size.value}" :model-value="true" ${isIconSize.value ? 'icon="star"' : 'label="Bold"'} aria-label="Toggle bold" />
</template>`,
)

function reset() {
  size.value = toggleDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose a text size or an icon-only square size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="toggleSizes" />
      </div>
    </template>
    <Toggle
      :size="size"
      :model-value="true"
      :icon="isIconSize ? 'star' : undefined"
      :label="isIconSize ? undefined : 'Bold'"
      aria-label="Toggle bold"
    />
  </ComponentExample>
</template>
