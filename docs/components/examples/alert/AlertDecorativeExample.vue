<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Announcement" description="This alert uses role=alert by default." />
    <Alert
      label="Decorative"
      description="This visual content is not announced as an alert."
      :decorative="true"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Decorative"
    description="Use decorative only when the content is purely visual."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Announcement" description="This alert uses role=alert by default." />
      <Alert
        label="Decorative"
        description="This visual content is not announced as an alert."
        :decorative="true"
      />
    </div>
  </ComponentExample>
</template>
