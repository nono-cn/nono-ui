<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const delays = ['200', '500', '1000']
const delayMs = ref('500')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const delayMs = ref('${delayMs.value}')
${scriptEnd}

<template>
  <Avatar src="/missing-avatar.png" :delay-ms="Number(delayMs)" label="JD" alt="Example profile" />
</template>`,
)

function reset() {
  delayMs.value = '500'
}
</script>

<template>
  <ComponentExample
    title="DelayMs"
    description="Choose how long to wait before showing the fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="delayMs" label="Delay (ms)" :options="delays" />
      </div>
    </template>
    <Avatar
      src="/missing-avatar.png"
      :delay-ms="Number(delayMs)"
      label="JD"
      alt="Example profile"
    />
  </ComponentExample>
</template>
