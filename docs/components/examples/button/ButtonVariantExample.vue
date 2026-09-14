<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, type ButtonVariant } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: ButtonVariant = 'solid'
const variant = ref<ButtonVariant>(initialVariant)
const variants: ButtonVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'>('${variant.value}')
${scriptEnd}

<template>
  <Button label="Más información" :variant="variant" />
</template>`,
)

function reset() {
  variant.value = initialVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Elige el tratamiento visual del botón."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-variant">
        variant
        <select
          id="button-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="buttonVariant in variants" :key="buttonVariant" :value="buttonVariant">
            {{ buttonVariant }}
          </option>
        </select>
      </label>
    </template>
    <Button label="Más información" :variant="variant" />
  </ComponentExample>
</template>
