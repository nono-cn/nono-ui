<script setup lang="ts">
import { computed, ref } from 'vue'
import { Collapsible } from '@/components/ui/Collapsible'
import { Button } from '@/components/ui/Button'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(true)
const disabled = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible } from '__DOCS_PACKAGE__/components/ui/Collapsible'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const open = ref(${open.value})
const disabled = ref(${disabled.value})
${scriptEnd}

<template>
  <Collapsible v-model="open" :disabled="disabled">
    <Button label="Team access" variant="outline" trailing-icon="chevronDown" />
    <template #content>
      <p class="pt-3 text-sm">Everyone on the team can view this project.</p>
    </template>
  </Collapsible>
</template>`,
)

function reset() {
  open.value = true
  disabled.value = false
}
</script>

<template>
  <ComponentExample
    title="Controlled state"
    description="Control the open and disabled states."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="open" label="Open" />
        <ExampleCheckboxControl v-model="disabled" label="Disabled" />
      </div>
    </template>
    <Collapsible v-model="open" :disabled="disabled" class="w-full max-w-md">
      <Button label="Team access" variant="outline" trailing-icon="chevronDown" />
      <template #content>
        <p class="pt-3 text-sm">Everyone on the team can view this project.</p>
      </template>
    </Collapsible>
  </ComponentExample>
</template>
