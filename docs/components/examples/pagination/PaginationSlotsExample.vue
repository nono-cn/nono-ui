<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(1)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="90" :sibling-count="1">
    <template #previous>
      <Button variant="plain" icon="chevronLeft" label="Previous" />
    </template>
    <template #next>
      <Button variant="plain" trailing-icon="chevronRight" label="Next" />
    </template>
    <template #trailing="{ page, pageCount }">
      <span class="ms-2 text-sm text-muted-foreground">Page {{ page }} of {{ pageCount }}</span>
    </template>
  </Pagination>
</template>`,
)

function reset() {
  page.value = 1
}
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Replace the controls with your own Button, and add content before or after the pages."
    :code="code"
    @reset="reset"
  >
    <Pagination v-model:page="page" :total="90" :sibling-count="1">
      <template #previous>
        <Button variant="plain" icon="chevronLeft" label="Previous" />
      </template>
      <template #next>
        <Button variant="plain" trailing-icon="chevronRight" label="Next" />
      </template>
      <template #trailing="{ page: current, pageCount }">
        <span class="ms-2 text-sm text-muted-foreground">
          Page {{ current }} of {{ pageCount }}
        </span>
      </template>
    </Pagination>
  </ComponentExample>
</template>
