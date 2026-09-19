<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Textarea } from '@/components/ui/Textarea'

const value = ref('')
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto grid max-w-4xl gap-6 p-6">
      <section class="grid gap-5 rounded-xl border bg-card p-5">
        <div>
          <h1 class="text-lg font-semibold">Textarea playground</h1>
          <p class="text-sm text-muted-foreground">Prueba el campo de texto multilínea.</p>
        </div>

        <Textarea
          v-model:value="value"
          aria-label="Textarea playground"
          placeholder="Escribe algo aquí..."
          rows="22"
        />

        <p class="text-sm text-muted-foreground">
          Valor: <span class="text-foreground">{{ value || 'vacío' }}</span>
        </p>
      </section>
    </main>
  </ConfigProvider>
</template>
