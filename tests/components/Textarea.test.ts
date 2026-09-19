import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import { testAttrs } from '../utils/testAttrs'

function mountTextarea(options: MountingOptions<TextareaProps> = {}) {
  return mount(Textarea, options)
}

const casesValue = [
  { input: 'Description', expected: 'Description' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const autoresizeCases = [
  { autoresize: undefined, expectedClass: 'field-sizing-fixed' },
  { autoresize: false, expectedClass: 'field-sizing-fixed' },
  { autoresize: true, expectedClass: 'field-sizing-content' },
]

describe('Textarea', () => {
  describe('props', () => {
    describe('autoresize', () => {
      it.each(autoresizeCases)(
        'aplica la clase correcta con autoresize=$autoresize',
        ({ autoresize, expectedClass }) => {
          const root = mountTextarea({ props: { autoresize } }).get('[data-test-textarea-root]')

          expect(root.classes()).toContain(expectedClass)
        },
      )
    })

    describe('value', () => {
      it.each(casesValue)('renderiza value=$input como "$expected"', ({ input, expected }) => {
        const root = mountTextarea({ props: { value: input } }).get('[data-test-textarea-root]')

        expect(root.element.value).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-textarea-root]',
      mount: (attrs) => mountTextarea({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('emite el valor actualizado cuando el usuario edita el textarea', async () => {
        const wrapper = mountTextarea({ props: { value: '' } })

        await wrapper.get('[data-test-textarea-root]').setValue('Updated value')

        expect(wrapper.emitted('update:value')).toEqual([['Updated value']])
      })
    })
  })
})
