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
    <FieldSet class="w-full" legend="Preferences" legend-variant="label">
      <div class="flex items-center gap-2">
        <Checkbox id="product-news" />
        <Label for="product-news">Product news</Label>
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Legend variant"
    description="Use label for a smaller legend within the group."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet class="w-full" legend="Preferences" legend-variant="label">
        <div class="flex items-center gap-2">
          <Checkbox id="product-news" />
          <Label for="product-news">Product news</Label>
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
