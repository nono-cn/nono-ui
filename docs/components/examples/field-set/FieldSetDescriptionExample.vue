<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import { FieldSet } from '@/components/ui/FieldSet'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import { FieldSet } from '__DOCS_PACKAGE__/components/ui/FieldSet'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="w-full max-w-none rounded-lg border border-border p-6">
    <FieldSet
      class="w-full"
      legend="Notifications"
      description="Choose which notifications you want to receive."
    >
      <div class="flex items-center gap-2">
        <Checkbox id="updates" />
        <Label for="updates">Product updates</Label>
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Description"
    description="Add supporting context below the legend."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet
        class="w-full"
        legend="Notifications"
        description="Choose which notifications you want to receive."
      >
        <div class="flex items-center gap-2">
          <Checkbox id="updates" />
          <Label for="updates">Product updates</Label>
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
