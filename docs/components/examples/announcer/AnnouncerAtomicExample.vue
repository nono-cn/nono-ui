<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialAtomic = true
const atomic = ref(initialAtomic)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'

const atomic = ref(${atomic.value})
${scriptEnd}

<template>
  <div>
    <Announcer message="La sincronización ha terminado." :atomic="atomic" />
  </div>
</template>`,
)

function reset() {
  atomic.value = initialAtomic
}
</script>

<template>
  <ComponentExample
    title="Atomic"
    description="Activa aria-atomic para anunciar la región completa en cada actualización."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="inline-flex items-center gap-2 text-xs font-medium" for="announcer-atomic">
        <input id="announcer-atomic" v-model="atomic" type="checkbox" />
        atomic
      </label>
    </template>
    <div class="grid gap-2 text-center">
      <Announcer message="La sincronización ha terminado." :atomic="atomic" />
      <span class="text-sm font-medium">aria-atomic: {{ atomic }}</span>
    </div>
  </ComponentExample>
</template>
