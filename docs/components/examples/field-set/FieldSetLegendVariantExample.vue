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
    <FieldSet class="w-full" legend="Preferencias" legend-variant="label">
      <div class="flex items-center gap-2">
        <Checkbox id="product-news" />
        <Label for="product-news">Novedades del producto</Label>
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="LegendVariant"
    description="Usa label para una leyenda más pequeña dentro del grupo."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet class="w-full" legend="Preferencias" legend-variant="label">
        <div class="flex items-center gap-2">
          <Checkbox id="product-news" />
          <Label for="product-news">Novedades del producto</Label>
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
