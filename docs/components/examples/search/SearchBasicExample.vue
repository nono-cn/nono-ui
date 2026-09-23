<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Search } from '@/components/ui/Search'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Search } from '__DOCS_PACKAGE__/components/ui/Search'
${scriptEnd}

<template>
  <Search aria-label="Search this site" class="flex w-full items-end gap-3" @submit.prevent>
    <div class="grid min-w-0 flex-1 gap-2">
      <Label for="site-search">Search</Label>
      <Input id="site-search" type="search" name="q" placeholder="Enter a search query" />
    </div>
    <Button type="submit">Search</Button>
  </Search>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic search"
    description="Combine a labeled field with a submit action."
    :code="code"
    :show-reset="false"
  >
    <Search
      aria-label="Search this site"
      class="flex w-full min-w-0 items-end gap-3"
      @submit.prevent
    >
      <div class="grid min-w-0 flex-1 gap-2">
        <Label for="site-search">Search</Label>
        <Input id="site-search" type="search" name="q" placeholder="Enter a search query" />
      </div>
      <Button type="submit">Search</Button>
    </Search>
  </ComponentExample>
</template>
