<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Chip color="#6366f1">
      <Avatar label="IN" size="lg" />
    </Chip>
    <Chip color="#22c55e">
      <Avatar label="VE" size="lg" />
    </Chip>
    <Chip color="#f97316">
      <Avatar label="NA" size="lg" />
    </Chip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado al indicador."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-6">
      <Chip color="#6366f1">
        <Avatar label="IN" size="lg" />
      </Chip>
      <Chip color="#22c55e">
        <Avatar label="VE" size="lg" />
      </Chip>
      <Chip color="#f97316">
        <Avatar label="NA" size="lg" />
      </Chip>
    </div>
  </ComponentExample>
</template>
