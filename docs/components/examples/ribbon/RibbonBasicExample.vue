<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'
${scriptEnd}

<template>
  <Ribbon :ribbons="[{ label: 'New' }]" class="w-72 rounded-xl">
    <Card label="Pro plan" description="Everything in Basic, plus more.">
      <p class="text-2xl font-semibold">$12/mo</p>
    </Card>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Mark a card with a corner ribbon."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="[{ label: 'New' }]" class="w-72 rounded-xl">
      <Card label="Pro plan" description="Everything in Basic, plus more.">
        <p class="text-2xl font-semibold">$12/mo</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
