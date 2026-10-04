<script setup lang="ts">
import { computed, ref } from 'vue'
import { Label } from '@/components/ui/Label'
import {
  Textarea,
  textareaDefaults,
  textareaSizes,
  type TextareaSize,
} from '@/components/ui/Textarea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<TextareaSize>(textareaDefaults.size)

const code = computed(
  () => `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="sized-textarea">Size</Label>
    <Textarea id="sized-textarea" size="${size.value}" placeholder="Write a message..." />
  </div>
</template>`,
)

function reset() {
  size.value = textareaDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the minimum height and text size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="textareaSizes" />
      </div>
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="sized-textarea">Size</Label>
      <Textarea id="sized-textarea" :size="size" placeholder="Write a message..." />
    </div>
  </ComponentExample>
</template>
