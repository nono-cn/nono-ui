<script setup lang="ts">
import { computed, ref } from 'vue'
import { Input, inputDefaults, inputSizes, type InputSize } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<InputSize>(inputDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="sized-input">Size</Label>
    <Input id="sized-input" size="${size.value}" placeholder="Type here..." />
  </div>
</template>`,
)

function reset() {
  size.value = inputDefaults.size
}
</script>

<template>
  <ComponentExample title="Size" description="Choose the field height." :code="code" @reset="reset">
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="inputSizes" />
      </div>
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="sized-input">Size</Label>
      <Input id="sized-input" :size="size" placeholder="Type here..." />
    </div>
  </ComponentExample>
</template>
