<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, type KbdVariant } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: KbdVariant = 'soft'
const variant = ref<KbdVariant>(initialVariant)
const variants: KbdVariant[] = ['solid', 'outline', 'soft', 'subtle']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'

const variant = ref<'solid' | 'outline' | 'soft' | 'subtle'>('${variant.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = initialVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Elige el tratamiento visual que mejor encaje con tu interfaz."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="kbd-variant">
        variant
        <select
          id="kbd-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="kbdVariant in variants" :key="kbdVariant" :value="kbdVariant">
            {{ kbdVariant }}
          </option>
        </select>
      </label>
    </template>
    <Kbd label="Ctrl" :variant="variant" />
  </ComponentExample>
</template>
