<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, buttonSizes, type ButtonSize } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ButtonSize>('md')
const square = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button icon="plus" size="${size.value}" :square="${square.value}" aria-label="Add item" />
</template>`,
)

function reset() {
  size.value = 'md'
  square.value = true
}
</script>

<template>
  <ComponentExample
    title="Square"
    description="Match an icon button's width to its height."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="buttonSizes" />
        <label class="flex h-9 items-center gap-2 text-sm font-medium">
          <input v-model="square" type="checkbox" class="size-4 accent-primary" />
          Square
        </label>
      </div>
    </template>
    <Button icon="plus" :size="size" :square="square" aria-label="Add item" />
  </ComponentExample>
</template>
