<script setup lang="ts">
import { ConfigProvider } from '@/components/provider'
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
import { Switch, type SwitchSeverity, type SwitchSize } from '@nono-cn/nono-ui/components/ui/Switch'
const color = ref('#2563eb')
const trackColor = ref('#dbeafe')
const columns = ref(3)
const sequential = ref(false)
const switchValue = ref(false)
const switchSize = ref<SwitchSize>('md')
const switchSeverity = ref<SwitchSeverity>('primary')
const switchColor = ref('')
const switchIcons = ref(true)
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
      <section class="grid gap-5 rounded-xl border bg-card p-5">
        <div>
          <h1 class="text-lg font-semibold">Switch playground</h1>
          <p class="text-sm text-muted-foreground">Prueba estados, tamaños, colores e iconos.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label class="grid gap-1.5 text-sm">
            size
            <select v-model="switchSize" class="rounded-md border bg-background px-2 py-1.5">
              <option v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">
                {{ value }}
              </option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            severity
            <select v-model="switchSeverity" class="rounded-md border bg-background px-2 py-1.5">
              <option
                v-for="value in ['primary', 'secondary', 'warning', 'success', 'error']"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            color
            <input
              v-model="switchColor"
              type="text"
              placeholder="#8b5cf6"
              class="rounded-md border bg-background px-2 py-1.5"
            />
          </label>
          <label class="flex items-center gap-2 self-end text-sm">
            <input v-model="switchIcons" type="checkbox" /> Icons
          </label>
        </div>
        <div class="flex items-center gap-4 rounded-lg bg-muted/30 p-6">
          <Switch
            v-model:value="switchValue"
            :size="switchSize"
            :severity="switchSeverity"
            :color="switchColor || undefined"
            :checked-icon="switchIcons ? { name: 'check' } : undefined"
            :unchecked-icon="switchIcons ? { name: 'x' } : undefined"
            aria-label="Switch playground"
          />
          <span class="text-sm text-muted-foreground">value: {{ switchValue }}</span>
        </div>
      </section>
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
      </section>
    </main>
  </ConfigProvider>
</template>
