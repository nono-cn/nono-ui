<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, type AlertVariant } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: AlertVariant = 'soft'
const variant = ref<AlertVariant>(initialVariant)
const variants: AlertVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'

const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft'>('${variant.value}')
${scriptEnd}

<template>
  <Alert
    label="Cambios guardados"
    description="Tus preferencias se han actualizado correctamente."
    :variant="variant"
  />
</template>`,
)

function reset() {
  variant.value = initialVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Elige el tratamiento visual del alert."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="alert-variant">
        variant
        <select
          id="alert-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="alertVariant in variants" :key="alertVariant" :value="alertVariant">
            {{ alertVariant }}
          </option>
        </select>
      </label>
    </template>
    <Alert
      label="Cambios guardados"
      description="Tus preferencias se han actualizado correctamente."
      :variant="variant"
    />
  </ComponentExample>
</template>
