<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#2563eb'
const initialTrackColor = '#dbeafe'
const color = ref(initialColor)
const trackColor = ref(initialTrackColor)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const color = ref(${JSON.stringify(color.value)})
const trackColor = ref(${JSON.stringify(trackColor.value)})
${scriptEnd}

<template>
  <Progress :value="65" :color="color" :track-color="trackColor" />
</template>`,
)

function reset() {
  color.value = initialColor
  trackColor.value = initialTrackColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Personaliza el indicador y el track con cualquier valor CSS válido."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full max-w-md gap-3 sm:grid-cols-2">
        <label class="grid gap-1.5 text-xs font-medium" for="progress-color">
          color
          <input
            id="progress-color"
            v-model="color"
            type="text"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          />
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="progress-track-color">
          trackColor
          <input
            id="progress-track-color"
            v-model="trackColor"
            type="text"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          />
        </label>
      </div>
    </template>
    <Progress class="w-full max-w-md" :value="65" :color="color" :track-color="trackColor" />
  </ComponentExample>
</template>
