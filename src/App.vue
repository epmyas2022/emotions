<script setup lang="ts">
import IconSend from './components/icons/IconSend.vue'
import {
  getEmojisList,
  SENTIMENT,
  colorsVariants,
  type SentimentInterface
} from './enums/sentiment'
import { reactive, ref } from 'vue'
import AppProgress from './components/shared/AppProgress.vue'

interface DataSentiment {
  Text: string
  Posibilities: {
    negative: number
    positive: number
    neutral: number
  }
  Predict: string
}

const dataSentiment = ref<DataSentiment>()
const text = ref('')
const progressBar = ref()
const sentiment = ref<SentimentInterface>()

const colors = reactive<{
  background: string
  color: string
}>({
  background: 'bg-transparent',
  color: 'text-white'
})

const dataProgress = ref()

const getSentiment = async (text: string) => {
  progressBar.value?.clearValues()

  const response = await fetch(import.meta.env.VITE_BASE_URL + text, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  dataSentiment.value = await response.json()
  sentiment.value = SENTIMENT[dataSentiment.value?.Predict as keyof typeof SENTIMENT]
  colors.background =
    colorsVariants.background[sentiment.value?.text as keyof typeof colorsVariants.background]

  colors.color = colorsVariants.text[sentiment.value?.text as keyof typeof colorsVariants.text]

  dataProgress.value = [
    { class: 'bg-red-300', title: 'Negative', value: dataSentiment.value?.Posibilities.negative },
    { class: 'bg-green-300', title: 'Positive', value: dataSentiment.value?.Posibilities.positive },
    { class: 'bg-yellow-300', title: 'Neutral', value: dataSentiment.value?.Posibilities.neutral }
  ]
}
</script>

<template>
  <main class="flex h-full justify-center items-center p-4">
    <div class="flex flex-col gap-4">
      <div class="text-3xl flex gap-2">
        <span v-for="(emoji, key) in getEmojisList()" :key="key">{{ emoji }}</span>
      </div>
      <h1 class="text-white font-bold text-2xl">Tensorflow Emotions</h1>
      <p class="text-slate-400 text-balance max-w-xl">
        Enter your phrase and it will respond if it is negative, neutral, positive, the model was
        trained with 25,000 comments from people
      </p>

      <form class="flex gap-4 flex-col sm:flex-row" @submit.prevent="getSentiment(text)">
        <input
          required
          class="w-full p-2 mt-4 rounded-md outline-none"
          placeholder="Enter your sentence"
          v-model="text"
        />
        <button
          type="submit"
          class="text-black p-1 gap-2 flex justify-center items-center bg-white sm:w-16 sm:rounded-full border-sky-300 border-[3px]"
        >
          <span class="sm:hidden">Send prayer</span>
          <IconSend class="text-slate-800" />
        </button>
      </form>

      <template v-if="dataProgress">
        <div :class="`${colors.background} h-1 rounded-sm`"></div>

        <div class="flex flex-col gap-2 items-center">
          <span :class="`${colors.color} font-bold text-xl`">
            {{ sentiment?.text.toLocaleUpperCase() }}
          </span>
        </div>

        <p class="text-white font-bold py-1">All possibilities</p>
        <app-progress ref="progressBar" :progress="dataProgress"></app-progress>
      </template>
    </div>
  </main>
</template>

<style scoped></style>
