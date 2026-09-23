<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="updates" />
    <Label for="updates">Receive updates</Label>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="For"
    description="Use the control’s id as the for value to preserve the accessible association."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-2">
      <Checkbox id="updates" />
      <Label for="updates">Receive updates</Label>
    </div>
  </ComponentExample>
</template>
