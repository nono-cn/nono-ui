<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
${scriptEnd}

<template>
  <Card>
    <template #header>
      <div class="grid gap-1 px-6">
        <h3 class="font-semibold">Recent activity</h3>
        <p class="text-sm text-muted-foreground">Latest transactions on your account.</p>
      </div>
    </template>
    <p>You made 3 transactions this week.</p>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom header"
    description="Use the header slot to control the entire header structure."
    :code="code"
    :show-reset="false"
  >
    <Card class="w-full max-w-md">
      <template #header>
        <div class="grid gap-1 px-6">
          <h3 class="font-semibold">Recent activity</h3>
          <p class="text-sm text-muted-foreground">Latest transactions on your account.</p>
        </div>
      </template>
      <p>You made 3 transactions this week.</p>
    </Card>
  </ComponentExample>
</template>
