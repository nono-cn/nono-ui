<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: BadgeVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const color = ref('#6366f1')
const variant = ref<BadgeVariant>('solid')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge, type BadgeVariant } from '__DOCS_PACKAGE__/components/ui/Badge'

const color = ref('${color.value}')
const variant = ref<BadgeVariant>('${variant.value}')
${scriptEnd}

<template>
  <Badge label="Custom color" :color="color" :variant="variant" />
</template>`,
)

function reset() {
  color.value = '#6366f1'
  variant.value = 'solid'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a custom color and see how each variant applies it."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleColorControl v-model="color" label="Color" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Badge label="Custom color" :color="color" :variant="variant" />
  </ComponentExample>
</template>
