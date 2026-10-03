<script setup lang="ts">
import { computed, ref } from 'vue'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const loading = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const loading = ref(${loading.value})
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="username-input">Username</Label>
    <Input
      id="username-input"
      :loading="loading"
      loading-icon="spinner"
      placeholder="Your username"
    >
      <template #leading>@</template>
    </Input>
  </div>
</template>`,
)

function reset() {
  loading.value = false
}
</script>

<template>
  <ComponentExample
    title="Loading"
    description="Replace leading content with a loading indicator while loading."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="loading" label="Loading" />
      </div>
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="username-input">Username</Label>
      <Input
        id="username-input"
        :loading="loading"
        loading-icon="spinner"
        placeholder="Your username"
      >
        <template #leading>@</template>
      </Input>
    </div>
  </ComponentExample>
</template>
