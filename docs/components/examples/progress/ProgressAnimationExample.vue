<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const animations = ['carousel', 'carousel-inverse', 'swing', 'elastic'] as const

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const animations = ['carousel', 'carousel-inverse', 'swing', 'elastic'] as const
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-5">
    <div
      v-for="animation in animations"
      :key="animation"
      class="grid grid-cols-[9rem_minmax(0,1fr)] items-center gap-4"
    >
      <span class="text-sm">{{ animation }}</span>
      <Progress :value="null" :animation="animation" :aria-label="'Progreso ' + animation" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Animation"
    description="Compara las cuatro animaciones disponibles para el progreso indeterminado."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div
        v-for="animation in animations"
        :key="animation"
        class="grid grid-cols-[9rem_minmax(0,1fr)] items-center gap-4"
      >
        <span class="text-sm">{{ animation }}</span>
        <Progress :value="null" :animation="animation" :aria-label="'Progreso ' + animation" />
      </div>
    </div>
  </ComponentExample>
</template>
