<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialRounded = false
const initialSquare = false
const initialRaised = false
const rounded = ref(initialRounded)
const square = ref(initialSquare)
const raised = ref(initialRaised)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const rounded = ref(${rounded.value})
const square = ref(${square.value})
const raised = ref(${raised.value})
${scriptEnd}

<template>
  <Button
    aria-label="Guardar"
    :icon="{ name: 'save' }"
    :rounded="rounded"
    :square="square"
    :raised="raised"
  />
</template>`,
)

function reset() {
  rounded.value = initialRounded
  square.value = initialSquare
  raised.value = initialRaised
}
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Combina las opciones de forma y elevación para crear un botón de icono."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <label class="inline-flex items-center gap-2 text-xs font-medium" for="button-rounded">
          <input id="button-rounded" v-model="rounded" type="checkbox" />
          rounded
        </label>
        <label class="inline-flex items-center gap-2 text-xs font-medium" for="button-square">
          <input id="button-square" v-model="square" type="checkbox" />
          square
        </label>
        <label class="inline-flex items-center gap-2 text-xs font-medium" for="button-raised">
          <input id="button-raised" v-model="raised" type="checkbox" />
          raised
        </label>
      </div>
    </template>
    <Button
      aria-label="Guardar"
      :icon="{ name: 'save' }"
      :rounded="rounded"
      :square="square"
      :raised="raised"
    />
  </ComponentExample>
</template>
