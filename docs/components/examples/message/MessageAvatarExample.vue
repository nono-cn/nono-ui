<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AvatarProps } from '@/components/ui/Avatar'
import { Message } from '@/components/ui/Message'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const kinds = ['label', 'icon', 'none'] as const
const kind = ref<(typeof kinds)[number]>('label')
const avatar = computed<AvatarProps | undefined>(() => {
  if (kind.value === 'label') return { label: 'AL', color: 'primary', size: 'sm' }
  if (kind.value === 'icon') return { icon: 'user', size: 'sm' }
  return undefined
})
const code = computed(
  () => `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${avatar.value ? `\nconst avatar = ${JSON.stringify(avatar.value)}\n` : ''}${scriptEnd}

<template>
  <Message${avatar.value ? ' :avatar="avatar"' : ''} message="The avatar takes the Avatar props." />
</template>`,
)

function reset() {
  kind.value = 'label'
}
</script>

<template>
  <ComponentExample
    title="Avatar"
    description="Pass Avatar props to show who sent the message."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="kind" label="Avatar" :options="kinds" />
    </template>
    <div class="w-full max-w-xl">
      <Message :avatar="avatar" message="The avatar takes the Avatar props." />
    </div>
  </ComponentExample>
</template>
