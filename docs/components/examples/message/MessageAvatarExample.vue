<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AvatarSize } from '@/components/ui/Avatar'
import { Message, type AvatarConfig } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: AvatarSize = 'md'
const size = ref<AvatarSize>(initialSize)
const avatar = computed<AvatarConfig>(() => ({ label: 'CN', size: size.value }))

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, type AvatarConfig } from '@nono-cn/nono-ui/components/ui/Message'
import type { AvatarSize } from '@nono-cn/nono-ui/components/ui/Avatar'

const size = ref<AvatarSize>('${size.value}')
const avatar = computed<AvatarConfig>(() => ({
  label: 'CN',
  size: size.value,
}))
${scriptEnd}

<template>
  <Message
    message="Este mensaje tiene un avatar configurable."
    :avatar="avatar"
    class="w-full max-w-md"
  />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Avatar"
    description="Configura las props públicas de Avatar mediante AvatarConfig."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="message-avatar-size">
        size
        <select
          id="message-avatar-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in ['xs', 'sm', 'md', 'lg']" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </label>
    </template>
    <Message
      message="Este mensaje tiene un avatar configurable."
      :avatar="avatar"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>
