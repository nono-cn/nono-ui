<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['warning', 'info', 'error', 'success', 'user', 'lock']
const icon = ref<IconName>('warning')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const iconName = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <AlertDialog
    label="Unsaved changes"
    description="Do you want to leave without saving your changes?"
    :icon="{ name: iconName }"
  >
    <Button label="Leave" variant="outline" />
  </AlertDialog>
</template>`,
)

function reset() {
  icon.value = 'warning'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon displayed with the dialog title."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="icons" />
      </div>
    </template>
    <AlertDialog
      label="Unsaved changes"
      description="Do you want to leave without saving your changes?"
      :icon="{ name: icon }"
    >
      <Button label="Leave" variant="outline" />
    </AlertDialog>
  </ComponentExample>
</template>
