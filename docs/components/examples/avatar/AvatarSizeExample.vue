<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, avatarDefaults, avatarSizes, type AvatarSize } from '@/components/ui/Avatar'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<AvatarSize>(avatarDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, type AvatarSize } from '__DOCS_PACKAGE__/components/ui/Avatar'

const size = ref<AvatarSize>('${size.value}')
${scriptEnd}

<template>
  <Avatar :size="size" label="JD" />
</template>`,
)

function reset() {
  size.value = avatarDefaults.size
}
</script>

<template>
  <ComponentExample title="Size" description="Choose the avatar size." :code="code" @reset="reset">
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="avatarSizes" />
      </div>
    </template>
    <Avatar :size="size" label="JD" />
  </ComponentExample>
</template>
