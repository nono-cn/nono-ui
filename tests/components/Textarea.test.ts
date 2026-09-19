import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

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

const sizeCases = [
  { size: undefined, expectedClass: 'min-h-20', expectedTextClass: 'text-base' },
  { size: 'xs', expectedClass: 'min-h-14', expectedTextClass: 'text-sm' },
  { size: 'sm', expectedClass: 'min-h-16', expectedTextClass: 'text-sm' },
  { size: 'md', expectedClass: 'min-h-20', expectedTextClass: 'text-base' },
  { size: 'lg', expectedClass: 'min-h-24', expectedTextClass: 'text-lg' },
  { size: 'xl', expectedClass: 'min-h-28', expectedTextClass: 'text-xl' },
] as const

const severityCases = [
  { severity: undefined, expectedClass: 'focus-visible:border-primary' },
  { severity: 'primary', expectedClass: 'focus-visible:border-primary' },
  { severity: 'secondary', expectedClass: 'focus-visible:border-secondary-foreground' },
  { severity: 'error', expectedClass: 'focus-visible:border-error' },
  { severity: 'warning', expectedClass: 'focus-visible:border-warning' },
  { severity: 'success', expectedClass: 'focus-visible:border-success' },
] as const

const highlightCases = [
  { highlight: undefined, severity: undefined, color: undefined, expectedClass: 'border-input' },
  { highlight: false, severity: 'error', color: undefined, expectedClass: 'border-input' },
  { highlight: true, severity: undefined, color: undefined, expectedClass: 'border-primary/40' },
  { highlight: true, severity: 'error', color: undefined, expectedClass: 'border-error/40' },
  {
    highlight: true,
    severity: 'error',
    color: '#7c3aed',
    expectedClass: 'border-(--textarea-color)/40',
    unexpectedClass: 'border-error/40',
  },
] as const

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

    describe('size', () => {
      it.each(sizeCases)('aplica el tamaño $size', ({ size, expectedClass, expectedTextClass }) => {
        const root = mountTextarea({ props: { size } }).get('[data-test-textarea-root]')

        expect(root.classes()).toContain(expectedClass)
        expect(root.classes()).toContain(expectedTextClass)
      })
    })

    describe('severity', () => {
      it.each(severityCases)('aplica severity=$severity', ({ severity, expectedClass }) => {
        const root = mountTextarea({ props: { severity } }).get('[data-test-textarea-root]')

        expect(root.classes()).toContain(expectedClass)
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica el color personalizado',
        id: '[data-test-textarea-root]',
        varColor: '--textarea-color',
        mount: (color) => mountTextarea({ props: { color } }),
      })

      it('sobreescribe severity', () => {
        const root = mountTextarea({ props: { color: '#7c3aed', severity: 'error' } }).get(
          '[data-test-textarea-root]',
        )

        expect(root.classes()).toContain('focus-visible:border-(--textarea-color)')
        expect(root.classes()).not.toContain('focus-visible:border-error')
      })
    })

    describe('highlight', () => {
      it.each(highlightCases)(
        'aplica highlight=$highlight con severity=$severity y color=$color',
        ({ highlight, severity, color, expectedClass, unexpectedClass }) => {
          const root = mountTextarea({ props: { highlight, severity, color } }).get(
            '[data-test-textarea-root]',
          )

          expect(root.classes()).toContain(expectedClass)
          if (unexpectedClass) expect(root.classes()).not.toContain(unexpectedClass)
        },
      )
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
