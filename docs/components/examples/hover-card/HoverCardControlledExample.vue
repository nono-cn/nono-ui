<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard } from '@/components/ui/HoverCard'
import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard } from '__DOCS_PACKAGE__/components/ui/HoverCard'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const open = ref(false)
${scriptEnd}

<template>
  <div>
    <Button :label="open ? 'Close card' : 'Open card'" type="button" @click="open = !open" />
    <HoverCard v-model:open="open">
      <Link to="#profile" label="@nonito" />
      <template #content><p>Controlled card content.</p></template>
    </HoverCard>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Controlled state"
    description="Toggle the card with a separate button."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <Button :label="open ? 'Close card' : 'Open card'" type="button" @click="open = !open" />
      <HoverCard v-model:open="open">
        <Link to="#profile" label="@nonito" />
        <template #content><p>Controlled card content.</p></template>
      </HoverCard>
    </div>
  </ComponentExample>
</template>
