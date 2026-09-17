<script setup lang="ts">
import { ConfigProvider } from '@/components/provider'
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
const color = ref('#2563eb')
const trackColor = ref('#dbeafe')
const columns = ref(3)
const sequential = ref(false)
const cards = [
  {
    title: 'Diseño',
    body: 'Contenido de altura variable para comprobar el reparto.',
    tone: 'bg-blue-100',
  },
  {
    title: 'Componentes',
    body: 'Una tarjeta algo más larga con más texto de ejemplo para forzar una altura diferente.',
    tone: 'bg-emerald-100',
  },
  { title: 'Vue', body: 'Slots y props.', tone: 'bg-amber-100' },
  { title: 'Tailwind', body: 'Estilos utilitarios y espaciado consistente.', tone: 'bg-pink-100' },
  {
    title: 'Masonry',
    body: 'La siguiente tarjeta se coloca en la columna más corta.',
    tone: 'bg-violet-100',
  },
  { title: 'Nono UI', body: 'Prueba visual del componente.', tone: 'bg-cyan-100' },
]
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto grid max-w-4xl gap-6 p-6">
      <Progress :value="65" :color="color" size="md" label="hola" :track-color="trackColor" />
      <section class="grid gap-4 rounded-xl border bg-card p-5">
        <div class="flex flex-wrap items-center gap-4">
          <label class="text-sm"
            >Columnas:
            <select v-model.number="columns" class="rounded-md border px-2 py-1">
              <option v-for="value in [1, 2, 3, 4]" :key="value" :value="value">{{ value }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="sequential" type="checkbox" /> Secuencial</label
          >
        </div>
        <Masonry :columns="columns" :sequential="sequential" :items="cards">
          <template #default="{ item }">
            <article class="rounded-lg border p-4 shadow-sm" :class="item.tone">
              <h2 class="font-semibold">{{ item.title }}</h2>
              <p class="mt-2 text-sm text-slate-700">{{ item.body }}</p>
            </article>
          </template>
        </Masonry>
      </section>
    </main>
  </ConfigProvider>
</template>
