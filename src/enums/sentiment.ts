export interface SentimentInterface {
  emoji: string
  text: string
}

export enum SentimentEnum {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative'
}
export enum EmojiEnum {
  POSITIVE = '😀',
  NEUTRAL = '😐',
  NEGATIVE = '😡'
}

export interface colorsVariantsInterface {
  background: {
    positive: string
    neutral: string
    negative: string
  }
  text: {
    positive: string
    neutral: string
    negative: string
  }
}
export const colorsVariants: colorsVariantsInterface = {
  background: {
    positive: 'bg-green-300',
    neutral: 'bg-yellow-300',
    negative: 'bg-red-300'
  },

  text: {
    positive: 'text-green-300',
    neutral: 'text-yellow-300',
    negative: 'text-red-300'
  }
}
export const SENTIMENT = {
  positive: {
    emoji: EmojiEnum.POSITIVE,
    text: SentimentEnum.POSITIVE
  },
  neutral: {
    emoji: EmojiEnum.NEUTRAL,
    text: SentimentEnum.NEUTRAL
  },
  negative: {
    emoji: EmojiEnum.NEGATIVE,
    text: SentimentEnum.NEGATIVE
  }
} as { [key in SentimentEnum]: SentimentInterface }

export const getEmojisList = () => Object.values(EmojiEnum).map((value) => value)

export const getSentimentList = () => Object.values(SentimentEnum).map((value) => value)
