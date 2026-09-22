<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import { FieldSet } from '@/components/ui/FieldSet'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'
import { FieldSet } from '@nono-cn/nono-ui/components/ui/FieldSet'
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
${scriptEnd}

<template>
  <div class="w-full max-w-none rounded-lg border border-border p-6">
    <FieldSet class="w-full" legend="Preferencias">
      <div class="flex items-center gap-2">
        <Checkbox id="emails" />
        <Label for="emails">
          Recibir emails
        </Label>
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Legend"
    description="Define el nombre accesible del grupo de controles."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet class="w-full" legend="Preferencias">
        <div class="flex items-center gap-2">
          <Checkbox id="emails" />
          <Label for="emails">Recibir emails</Label>
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
