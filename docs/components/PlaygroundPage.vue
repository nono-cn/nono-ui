<script setup lang="ts">
import { ConfigProvider } from '@/components/provider'
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
const color = ref("#2563eb")
const trackColor = ref("#dbeafe")
</script>

<template>
  <ConfigProvider>
  <br/>
    <Progress :value="65" :color="color" size="md" label="hola" :track-color="trackColor" />
  </ConfigProvider>
</template>
