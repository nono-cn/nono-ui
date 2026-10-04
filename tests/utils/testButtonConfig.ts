import type { VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import { Button, type NormalizeButtonProps } from '@/components/ui/Button'

interface TestButtonConfigOptions {
  text: string
  id: string
  mount: (input: NormalizeButtonProps) => VueWrapper | Promise<VueWrapper>
}

export function testButtonConfig({ text, id, mount }: TestButtonConfigOptions) {
  it(text, async () => {
    const onClick = vi.fn()
    const input: NormalizeButtonProps = {
      as: 'a',
      asChild: false,
      label: 'Close',
      variant: 'outline',
      size: 'icon-lg',
      radius: 12,
      loading: false,
      color: '#123456',
      icon: 'star',
      trailingIcon: 'chevronRight',
      onClick,
      id: 'custom-button',
      'aria-label': 'Close',
      title: 'Título',
      'data-test-config': 'valor',
      class: 'custom-button',
      style: 'opacity: 0.5',
    }

    const wrapper = await mount(input)
    const button = wrapper
      .findAllComponents(Button)
      .find((component) => component.attributes('id') === input.id)

    if (!button) throw new Error(`Expected Button ${id}`)

    for (const name of [
      'as',
      'asChild',
      'label',
      'variant',
      'size',
      'radius',
      'loading',
      'color',
      'icon',
      'trailingIcon',
    ] as const) {
      expect(button.props(name)).toBe(input[name])
    }

    for (const name of ['id', 'aria-label', 'title', 'data-test-config'] as const) {
      expect(button.attributes(name)).toBe(input[name])
    }
    expect(button.classes()).toContain(input.class)
    expect(button.attributes('style')).toContain(input.style)

    await button.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(Event)
    expect(onClick.mock.calls[0][0].type).toBe('click')
  })
}
