import { mount } from '@vue/test-utils'
import RecordingIndicator from '@/components/shared/RecordingIndicator'

describe('Recording Indicator', () => {
  it('gets class when on prop is true', () => {
    const ri = mount(RecordingIndicator)
    ri.setProps({ on: false })
    expect(ri.vm.$el.classList.length).toBe(1)
    ri.setProps({ on: true })
    expect(ri.vm.$el.classList.length).toBe(2)
  })
})
