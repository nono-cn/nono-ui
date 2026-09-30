<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, buttonIconSizes, type IconButtonSize } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<IconButtonSize>('icon')
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button icon="plus" size="${size.value}" aria-label="Add item" />
</template>`,
)

function reset() {
  size.value = 'icon'
}
</script>

<template>
  <ComponentExample
    title="Icon size"
    description="Choose a square size for an icon-only button. Icon is the medium size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="buttonIconSizes" />
      </div>
    </template>
    <Button icon="plus" :size="size" aria-label="Add item" />
  </ComponentExample>
</template>
