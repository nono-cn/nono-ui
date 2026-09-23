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
  <div class="grid w-full max-w-lg gap-6">
    <div class="grid gap-3">
      <span class="font-medium">Horizontal</span>
      <div class="grid gap-5">
        <div
          v-for="animation in animations"
          :key="animation"
          class="grid grid-cols-[9rem_minmax(0,1fr)] items-center gap-4"
        >
          <span class="text-sm">{{ animation }}</span>
          <Progress
            :value="null"
            :animation="animation"
            :aria-label="'Horizontal progress ' + animation"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-3">
      <span class="font-medium">Vertical</span>
      <div class="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
        <div
          v-for="animation in animations"
          :key="animation"
          class="grid justify-items-center gap-2"
        >
          <span class="text-center text-sm">{{ animation }}</span>
          <div class="h-32">
            <Progress
              :value="null"
              :animation="animation"
              orientation="vertical"
              :aria-label="'Vertical progress ' + animation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Animation"
    description="Compare the four animations in horizontal and vertical orientations."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-6">
      <div class="grid gap-3">
        <span class="font-medium">Horizontal</span>
        <div class="grid gap-5">
          <div
            v-for="animation in animations"
            :key="animation"
            class="grid grid-cols-[9rem_minmax(0,1fr)] items-center gap-4"
          >
            <span class="text-sm">{{ animation }}</span>
            <Progress
              :value="null"
              :animation="animation"
              :aria-label="'Horizontal progress ' + animation"
            />
          </div>
        </div>
      </div>
      <div class="grid gap-3">
        <span class="font-medium">Vertical</span>
        <div class="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          <div
            v-for="animation in animations"
            :key="animation"
            class="grid justify-items-center gap-2"
          >
            <span class="text-center text-sm">{{ animation }}</span>
            <div class="h-32">
              <Progress
                :value="null"
                :animation="animation"
                orientation="vertical"
                :aria-label="'Vertical progress ' + animation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ComponentExample>
</template>
