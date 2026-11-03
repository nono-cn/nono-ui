<script setup lang="ts">
import { Avatar, type AvatarUI } from '@/components/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui: AvatarUI = {
  image: () => ({ class: 'grayscale' }),
  fallback: () => ({ class: 'font-semibold tracking-wide' }),
}

const code = `<script setup lang="ts">
import { Avatar, type AvatarUI } from '__DOCS_PACKAGE__/components/Avatar'

const ui: AvatarUI = {
  image: () => ({ class: 'grayscale' }),
  fallback: () => ({ class: 'font-semibold tracking-wide' }),
}
${scriptEnd}

<template>
  <Avatar src="https://i.pravatar.cc/150?img=3" alt="Example profile" :ui="ui" />
  <Avatar label="JD" :ui="ui" />
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the image and fallback attributes."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="Example profile" :ui="ui" />
      <Avatar label="JD" :ui="ui" />
    </div>
  </ComponentExample>
</template>
