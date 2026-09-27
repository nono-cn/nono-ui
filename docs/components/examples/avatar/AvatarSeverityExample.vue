<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, type AvatarSeverity } from '@/components/ui/Avatar'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities: AvatarSeverity[] = [
  'primary',
  'secondary',
  'neutral',
  'warning',
  'success',
  'error',
]
const severity = ref<AvatarSeverity>('neutral')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, type AvatarSeverity } from '__DOCS_PACKAGE__/components/ui/Avatar'

const severity = ref<AvatarSeverity>('${severity.value}')
${scriptEnd}

<template>
  <Avatar :severity="severity" label="JD" />
</template>`,
)

function reset() {
  severity.value = 'neutral'
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose the semantic color used by the avatar fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="severity" label="Severity" :options="severities" />
      </div>
    </template>
    <Avatar :severity="severity" label="JD" />
  </ComponentExample>
</template>
