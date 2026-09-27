<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: BadgeVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const variant = ref<BadgeVariant>('solid')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge, type BadgeVariant } from '__DOCS_PACKAGE__/components/ui/Badge'

const variant = ref<BadgeVariant>('${variant.value}')
${scriptEnd}

<template>
  <Badge label="Active" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = 'solid'
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the visual style applied to the badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Badge label="Active" :variant="variant" />
  </ComponentExample>
</template>
