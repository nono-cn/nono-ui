import type { VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import { Input, type NormalizeInputProps } from '@/components/ui/Input'

interface TestInputConfigOptions {
  text: string
  id: string
  mount: (input: NormalizeInputProps) => VueWrapper | Promise<VueWrapper>
}

export function testInputConfig({ text, id, mount }: TestInputConfigOptions) {
  it(text, async () => {
    const onUpdateModelValue = vi.fn()
    const input: NormalizeInputProps = {
      id: 'custom-input',
      class: 'custom-input',
      style: 'opacity: 0.5',
      'aria-label': 'Filtrar opciones',
      size: 'sm',
      variant: 'plain',
      color: '#ff0000',
      highlight: true,
      'onUpdate:modelValue': onUpdateModelValue,
    }

    const wrapper = await mount(input)
    const component = wrapper
      .findAllComponents(Input)
      .find((inputComponent) => inputComponent.find(id).exists())

    if (!component) throw new Error(`Expected Input ${id}`)
    const inputElement = component.get('[data-test-input-root]')

    expect(component.exists()).toBe(true)
    expect(component.props()).toMatchObject({
      size: input.size,
      variant: input.variant,
      color: input.color,
      highlight: input.highlight,
    })
    expect(inputElement.attributes('id')).toBe(input.id)
    expect(inputElement.classes()).toContain(input.class)
    expect(inputElement.attributes('style')).toContain('opacity: 0.5')
    expect(inputElement.attributes('aria-label')).toBe(input['aria-label'])

    await inputElement.setValue('Nuevo valor')
    expect(onUpdateModelValue).toHaveBeenCalledWith('Nuevo valor')
  })
}
