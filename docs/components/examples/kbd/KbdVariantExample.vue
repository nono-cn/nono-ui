<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, kbdDefaults, kbdVariantNames, type KbdVariant } from '@/components/ui/Kbd'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<KbdVariant>(kbdDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd, type KbdVariant } from '__DOCS_PACKAGE__/components/ui/Kbd'

const variant = ref<KbdVariant>('${variant.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = kbdDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the visual style applied to the key."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="kbdVariantNames" />
      </div>
    </template>
    <Kbd label="Ctrl" :variant="variant" />
  </ComponentExample>
</template>
