<script setup lang="ts">
import { computed, ref } from 'vue'
import { Label } from '@/components/ui/Label'
import {
  Textarea,
  textareaDefaults,
  textareaVariantNames,
  type TextareaVariant,
} from '@/components/ui/Textarea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<TextareaVariant>(textareaDefaults.variant)

const code = computed(
  () => `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="variant-textarea">Variant</Label>
    <Textarea id="variant-textarea" variant="${variant.value}" placeholder="Write a message..." />
  </div>
</template>`,
)

function reset() {
  variant.value = textareaDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the border and background style."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="textareaVariantNames" />
      </div>
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="variant-textarea">Variant</Label>
      <Textarea id="variant-textarea" :variant="variant" placeholder="Write a message..." />
    </div>
  </ComponentExample>
</template>
