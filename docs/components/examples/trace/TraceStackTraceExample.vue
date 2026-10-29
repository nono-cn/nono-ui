<script setup lang="ts">
import { ref } from 'vue'
import { Trace, type TraceItem } from '@/components/ui/Trace'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const stack = `TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (/app/src/components/UserList.vue:24:18)
    at renderComponentRoot (/app/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:890:16)
    at loadUsers (/app/src/services/users.ts:12:9)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`

const lines = stack.split('\n').map((line) => line.trim())
const frames = lines.slice(1)
const items: TraceItem[] = [{ value: 'error', label: lines[0], status: 'error' }]
const open = ref(['error'])

function isInternal(frame: string) {
  return frame.includes('node_modules') || frame.includes('node:')
}

const code = `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Trace } from '__DOCS_PACKAGE__/components/ui/Trace'

const props = defineProps<{ stack: string }>()

const lines = computed(() => props.stack.split('\\n').map((line) => line.trim()))
const frames = computed(() => lines.value.slice(1))
const items = computed(() => [{ value: 'error', label: lines.value[0], status: 'error' }])
const open = ref(['error'])

function isInternal(frame: string) {
  return frame.includes('node_modules') || frame.includes('node:')
}
${scriptEnd}

<template>
  <Trace v-model="open" :items="items">
    <template #content>
      <ol class="grid gap-1 font-mono text-xs">
        <li
          v-for="frame in frames"
          :key="frame"
          :class="isInternal(frame) ? 'text-muted-foreground' : 'text-foreground'"
        >
          {{ frame }}
        </li>
      </ol>
    </template>
  </Trace>
</template>`
</script>

<template>
  <ComponentExample
    title="Stack trace"
    description="Parse an error stack: the first line is the label and the frames go in the content slot."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Trace v-model="open" :items="items">
        <template #content>
          <ol class="grid gap-1 overflow-x-auto font-mono text-xs">
            <li
              v-for="frame in frames"
              :key="frame"
              class="whitespace-nowrap"
              :class="isInternal(frame) ? 'text-muted-foreground' : 'text-foreground'"
            >
              {{ frame }}
            </li>
          </ol>
        </template>
      </Trace>
    </div>
  </ComponentExample>
</template>
