<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, kbdDefaults, kbdSizes, type KbdSize } from '@/components/ui/Kbd'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<KbdSize>(kbdDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd, type KbdSize } from '__DOCS_PACKAGE__/components/ui/Kbd'

const size = ref<KbdSize>('${size.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" :size="size" />
</template>`,
)

function reset() {
  size.value = kbdDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the key size and internal spacing."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="kbdSizes" />
      </div>
    </template>
    <Kbd label="Ctrl" :size="size" />
  </ComponentExample>
</template>
