<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, type AvatarShape } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialShape: AvatarShape = 'rounded'
const shape = ref<AvatarShape>(initialShape)
const shapes: AvatarShape[] = ['rounded', 'square']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'

const shape = ref<'rounded' | 'square'>('${shape.value}')
${scriptEnd}

<template>
  <Avatar label="CN" :shape="shape" />
</template>`,
)

function reset() {
  shape.value = initialShape
}
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Cambia entre la forma circular y la cuadrada."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="avatar-shape">
        shape
        <select
          id="avatar-shape"
          v-model="shape"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="avatarShape in shapes" :key="avatarShape" :value="avatarShape">
            {{ avatarShape }}
          </option>
        </select>
      </label>
    </template>
    <Avatar label="CN" :shape="shape" />
  </ComponentExample>
</template>
