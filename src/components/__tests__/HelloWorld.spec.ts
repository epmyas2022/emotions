import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppProgress from '../shared/AppProgress.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppProgress, {
      props: { progress: [{ class: 'bg-blue-500', title: 'Test', value: 20 }] }
    })
    const progress = wrapper.findComponent(AppProgress)
    expect(progress.exists()).toBe(true)
  })
})
