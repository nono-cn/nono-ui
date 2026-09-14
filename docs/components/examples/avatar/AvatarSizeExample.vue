<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, type AvatarSize } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: AvatarSize = 'md'
const size = ref<AvatarSize>(initialSize)
const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'

const size = ref<'xs' | 'sm' | 'md' | 'lg'>('${size.value}')
${scriptEnd}

<template>
  <Avatar label="CN" :size="size" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Selecciona el tamaño visual del avatar."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="avatar-size">
        size
        <select
          id="avatar-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="avatarSize in sizes" :key="avatarSize" :value="avatarSize">
            {{ avatarSize }}
          </option>
        </select>
      </label>
    </template>
    <Avatar label="CN" :size="size" />
  </ComponentExample>
</template>
