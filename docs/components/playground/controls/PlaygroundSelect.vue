<script setup lang="ts">
defineProps<{ label: string; options: readonly string[] }>()
const model = defineModel<string>({ required: true })
</script>
<template>
  <label class="playground-control"
    ><span>{{ label }}</span
    ><select v-model="model">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select></label
  >
</template>
