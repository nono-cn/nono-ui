<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialState = 'idle' as const
const state = ref<'idle' | 'uploading' | 'processing' | 'error' | 'done'>(initialState)
const states = ['idle', 'uploading', 'processing', 'error', 'done'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const state = ref<'idle' | 'uploading' | 'processing' | 'error' | 'done'>('${state.value}')
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-2">
    <Attachment
      label="video.mp4"
      :description="state"
      :icon="{ name: 'file', 'aria-hidden': true }"
      :state="state"
    />
  </div>
</template>`,
)

function reset() {
  state.value = initialState
}
</script>

<template>
  <ComponentExample
    title="State"
    description="Cambia el estado visual del archivo y observa el spinner de uploading."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="attachment-state">
        state
        <select
          id="attachment-state"
          v-model="state"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in states" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <div class="grid w-full max-w-md gap-2">
      <Attachment
        label="video.mp4"
        :description="state"
        :icon="{ name: 'file', 'aria-hidden': true }"
        :state="state"
      />
      <p class="text-xs text-muted-foreground">
        El estado se muestra también como texto: <code>{{ state }}</code>
      </p>
    </div>
  </ComponentExample>
</template>
