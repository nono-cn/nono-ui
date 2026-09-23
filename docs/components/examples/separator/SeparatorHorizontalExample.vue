<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-4">
    <section class="grid gap-1">
      <h3 class="font-medium">Profile</h3>
      <p class="text-sm text-muted-foreground">Manage your personal information.</p>
    </section>
    <Separator />
    <section class="grid gap-1">
      <h3 class="font-medium">Privacy</h3>
      <p class="text-sm text-muted-foreground">Control who can see your profile.</p>
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Separate content sections using the default horizontal orientation."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-4">
      <section class="grid gap-1">
        <h3 class="font-medium">Profile</h3>
        <p class="text-sm text-muted-foreground">Manage your personal information.</p>
      </section>
      <Separator />
      <section class="grid gap-1">
        <h3 class="font-medium">Privacy</h3>
        <p class="text-sm text-muted-foreground">Control who can see your profile.</p>
      </section>
    </div>
  </ComponentExample>
</template>
