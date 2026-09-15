<script setup lang="ts">
import { computed, ref } from 'vue'
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialStatus = true
const status = ref(initialStatus)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'

const status = ref(${status.value})
${scriptEnd}

<template>
  <Marker label="Sincronización completada" :status="status" />
</template>`,
)

function reset() {
  status.value = initialStatus
}
</script>

<template>
  <ComponentExample
    title="Status"
    description="Activa role=status para exponer una actualización de estado."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="inline-flex items-center gap-2 text-xs font-medium" for="marker-status">
        <input id="marker-status" v-model="status" type="checkbox" class="size-4 accent-primary" />
        status
      </label>
    </template>
    <div class="grid w-full max-w-md gap-2">
      <Marker label="Sincronización completada" :status="status" />
      <p class="text-center text-xs text-muted-foreground">
        role actual: <code>{{ status ? 'status' : 'sin role propio' }}</code>
      </p>
    </div>
  </ComponentExample>
</template>
