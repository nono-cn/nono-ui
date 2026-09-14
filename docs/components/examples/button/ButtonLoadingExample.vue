<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLoading = false
const loading = ref(initialLoading)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const loading = ref(${loading.value})
${scriptEnd}

<template>
  <Button label="Guardar" :icon="{ name: 'save' }" :loading="loading" />
</template>`,
)

function reset() {
  loading.value = initialLoading
}
</script>

<template>
  <ComponentExample
    title="Loading"
    description="Mientras loading es true, se muestra un spinner y se comunican aria-busy y aria-disabled."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="inline-flex items-center gap-2 text-xs font-medium" for="button-loading">
        <input id="button-loading" v-model="loading" type="checkbox" />
        loading
      </label>
    </template>
    <Button label="Guardar" :icon="{ name: 'save' }" :loading="loading" />
  </ComponentExample>
</template>
