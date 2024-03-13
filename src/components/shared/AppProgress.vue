<template>
  <div
    :style="{ maxWidth: `${total}%` }"
    class="h-5 bg-slate-300 flex box-border overflow-x-hidden"
    ref="progressBar"
  >
    <div
      v-for="(progress, key) in props.progress"
      :key="key"
      :style="{
        minWidth: `${calculateWidth(progress.value)}%`
      }"
      :class="`h-5 ${progress.class} progress-animation progress-item`"
    >
      <p class="flex h-full justify-center items-center text-slate-900 text-xs md:text-sm">
        {{ progress.value }}%
      </p>
    </div>
  </div>
  <div class="flex flex-col gap-4 py-2" v-if="progress">
    <div class="flex justify-between">
      <p v-for="(progress, key) in props.progress" :key="key" class="text-white font-bold text-sm">
        {{ progress.title.toLocaleUpperCase() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const progressBar = ref<HTMLElement>()

const props = defineProps<{
  progress: Array<{ class: string; title: string; value: number }>
}>()

const total = ref<number>(0)

const totalValues = () =>
  (total.value = props.progress.reduce((acc, current) => acc + current.value, 0))

const calculateWidth = (current: number) => {
  if (current <= 0) return 0
  return current - 10
}

const clearValues = () => {
  const progressItems = progressBar.value?.querySelectorAll(
    '.progress-item'
  ) as NodeListOf<HTMLElement>

  if (!progressItems) return

  progressItems.forEach((item) => {
    item.style.minWidth = '0%'
  })
}

totalValues()

defineExpose({
  clearValues
})
</script>

<style scoped>
@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.progress-animation {
  animation: progress 2s linear;
  animation-fill-mode: forwards;
  transition: all 2s;
}
</style>
