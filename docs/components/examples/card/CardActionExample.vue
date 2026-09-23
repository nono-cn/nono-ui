<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
${scriptEnd}

<template>
  <Card label="Preferences" description="Manage your notification preferences.">
    <template #action>
      <Button label="Edit" variant="outline" size="sm" />
    </template>
    <p>You’ll receive a weekly email summary.</p>
    <template #footer>
      <span class="text-sm text-muted-foreground">Updated just now</span>
    </template>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Action and footer"
    description="Combine the action and footer slots."
    :code="code"
    :show-reset="false"
  >
    <Card
      label="Preferences"
      description="Manage your notification preferences."
      class="w-full max-w-md"
    >
      <template #action>
        <Button label="Edit" variant="outline" size="sm" />
      </template>
      <p>You’ll receive a weekly email summary.</p>
      <template #footer>
        <span class="text-sm text-muted-foreground">Updated just now</span>
      </template>
    </Card>
  </ComponentExample>
</template>
