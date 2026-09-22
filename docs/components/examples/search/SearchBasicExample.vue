<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Search } from '@/components/ui/Search'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Search } from '__DOCS_PACKAGE__/components/ui/Search'
<\/script>

<template>
  <Search aria-label="Buscar en el sitio" class="flex w-full items-end gap-3" @submit.prevent>
    <div class="grid min-w-0 flex-1 gap-2">
      <Label for="site-search">Buscar</Label>
      <Input id="site-search" type="search" name="q" placeholder="Escribe una búsqueda" />
    </div>
    <Button type="submit">Buscar</Button>
  </Search>
</template>`
</script>

<template>
  <ComponentExample
    title="Búsqueda básica"
    description="Combina un campo etiquetado y una acción de envío."
    :code="code"
    :show-reset="false"
  >
    <Search
      aria-label="Buscar en el sitio"
      class="flex w-full min-w-0 items-end gap-3"
      @submit.prevent
    >
      <div class="grid min-w-0 flex-1 gap-2">
        <Label for="site-search">Buscar</Label>
        <Input id="site-search" type="search" name="q" placeholder="Escribe una búsqueda" />
      </div>
      <Button type="submit">Buscar</Button>
    </Search>
  </ComponentExample>
</template>
