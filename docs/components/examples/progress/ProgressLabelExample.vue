<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLabel = 'Cargando archivos'
const label = ref(initialLabel)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Progress :value="72" :label="label" />
</template>`,
)

function reset() {
  label.value = initialLabel
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Personaliza el texto visible de la etiqueta sobre la barra de progreso."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid w-full max-w-md gap-1.5 text-xs font-medium" for="progress-label">
        label
        <input
          id="progress-label"
          v-model="label"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        />
      </label>
    </template>
    <Progress class="w-full max-w-md" :value="72" :label="label" />
  </ComponentExample>
</template>
