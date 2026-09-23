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
  <div class="grid w-full gap-5">
    <Search aria-label="Search articles" class="flex items-end gap-3" @submit.prevent>
      <div class="grid min-w-0 flex-1 gap-2">
        <Label for="article-search">Articles</Label>
        <Input id="article-search" type="search" name="articles" placeholder="Article title" />
      </div>
      <Button type="submit">Search</Button>
    </Search>
    <Search aria-labelledby="product-search-title" class="grid gap-2" @submit.prevent>
      <Label id="product-search-title" for="product-search">Products</Label>
      <div class="flex items-end gap-3">
        <Input id="product-search" type="search" name="products" placeholder="Product name" />
        <Button type="submit">Search</Button>
      </div>
    </Search>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Multiple regions"
    description="Each form has a distinct accessible name."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full min-w-0 gap-5">
      <Search aria-label="Search articles" class="flex min-w-0 items-end gap-3" @submit.prevent>
        <div class="grid min-w-0 flex-1 gap-2">
          <Label for="article-search">Articles</Label>
          <Input id="article-search" type="search" name="articles" placeholder="Article title" />
        </div>
        <Button type="submit">Search</Button>
      </Search>
      <Search aria-labelledby="product-search-title" class="grid min-w-0 gap-2" @submit.prevent>
        <Label id="product-search-title" for="product-search">Products</Label>
        <div class="flex min-w-0 items-end gap-3">
          <Input id="product-search" type="search" name="products" placeholder="Product name" />
          <Button type="submit">Search</Button>
        </div>
      </Search>
    </div>
  </ComponentExample>
</template>
