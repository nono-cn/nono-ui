import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestAttrsOptions {
  text: string
  id: string
  assertId?: boolean
  assertAriaLabel?: boolean
  mount: (attrs: Record<string, string>) => VueWrapper | Promise<VueWrapper>
}

const attrs = {
  id: 'test-component',
  'aria-label': 'Component',
  class: 'custom-component',
  style: 'opacity: 0.5',
}

export function testAttrs({
  text = 'forwards arbitrary attrs, class and style to root',
  id,
  assertId = true,
  assertAriaLabel = true,
  mount,
}: TestAttrsOptions) {
  it(text, async () => {
    const root = (await mount(attrs)).get(id)

    if (assertId) {
      expect(root.attributes('id')).toBe(attrs.id)
    }
    if (assertAriaLabel) {
      expect(root.attributes('aria-label')).toBe(attrs['aria-label'])
    }
    expect(root.classes()).toContain(attrs.class)
    expect(root.attributes('style')).toContain(attrs.style)
  })
}
