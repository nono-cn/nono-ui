import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountTextarea(options: MountingOptions<TextareaProps> = {}) {
  return mount(Textarea, options)
}

const casesModelValue = [
  { input: undefined, expected: '' },
  { input: '', expected: '' },
  { input: 'A longer message', expected: 'A longer message' },
]

const casesInvalidModelValue = [
  { input: 42, expected: { value: '42', warns: true } },
  { input: null, expected: { value: '', warns: false } },
  { input: false, expected: { value: 'false', warns: true } },
]

const casesSize = [
  { input: undefined, expected: { height: 'min-h-20', padding: 'px-3', text: 'text-base' } },
  { input: 'xs', expected: { height: 'min-h-14', padding: 'px-2', text: 'text-sm' } },
  { input: 'sm', expected: { height: 'min-h-16', padding: 'px-2.5', text: 'text-sm' } },
  { input: 'md', expected: { height: 'min-h-20', padding: 'px-3', text: 'text-base' } },
  { input: 'lg', expected: { height: 'min-h-24', padding: 'px-3', text: 'text-lg' } },
  { input: 'xl', expected: { height: 'min-h-28', padding: 'px-4', text: 'text-xl' } },
  { input: 'invalid', expected: { height: 'min-h-20', padding: 'px-3', text: 'text-base' } },
]

const casesAutoresize = [
  { input: undefined, expected: 'field-sizing-fixed' },
  { input: false, expected: 'field-sizing-fixed' },
  { input: true, expected: 'field-sizing-content' },
]

const casesHighlight = [
  { input: undefined, expected: 'border-input' },
  { input: false, expected: 'border-input' },
  { input: true, expected: 'border-(--textarea-color)/40' },
]

const casesVariant = [
  {
    input: undefined,
    expected: { classes: ['rounded-md', 'border', 'bg-transparent', 'shadow-xs'] },
  },
  {
    input: 'outline',
    expected: { classes: ['rounded-md', 'border', 'bg-transparent', 'shadow-xs'] },
  },
  {
    input: 'subtle',
    expected: { classes: ['rounded-md', 'border', 'bg-muted', 'shadow-xs'] },
  },
  {
    input: 'soft',
    expected: { classes: ['rounded-md', 'border-transparent', 'bg-muted/50', 'shadow-none'] },
  },
  {
    input: 'plain',
    expected: { classes: ['rounded-md', 'border-transparent', 'bg-transparent', 'shadow-none'] },
  },
  {
    input: 'none',
    expected: {
      classes: ['rounded-md', 'border-0', 'bg-transparent', 'shadow-none', 'focus-visible:ring-0'],
    },
  },
]

describe('Textarea', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'renderiza modelValue=$input como "$expected"',
        ({ input, expected }) => {
          const root = mountTextarea({
            props: { modelValue: input as TextareaProps['modelValue'] },
          }).get('[data-test-textarea-root]')

          expect(root.element.value).toBe(expected)
        },
      )

      it.each(casesInvalidModelValue)(
        'renderiza el valor inválido modelValue=$input como "$expected.value"',
        ({ input, expected }) => {
          const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

          try {
            const root = mountTextarea({
              props: { modelValue: input as TextareaProps['modelValue'] },
            }).get('[data-test-textarea-root]')

            expect(root.element.value).toBe(expected.value)
            expect(
              warn.mock.calls
                .flat()
                .join(' ')
                .includes('Invalid prop: type check failed for prop "modelValue"'),
            ).toBe(expected.warns)
          } finally {
            warn.mockRestore()
          }
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('aplica las clases de size=$input', ({ input, expected }) => {
        const root = mountTextarea({
          props: { size: input as TextareaProps['size'] },
        }).get('[data-test-textarea-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([expected.height, expected.padding, expected.text]),
        )
      })
    })

    describe('autoresize', () => {
      it.each(casesAutoresize)('aplica autoresize=$input como $expected', ({ input, expected }) => {
        const root = mountTextarea({ props: { autoresize: input } }).get(
          '[data-test-textarea-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-textarea-root]',
        varColor: '--textarea-color',
        mount: (color) => mountTextarea({ props: { color } }),
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--textarea-color-foreground',
          solidVar: '--textarea-solid',
          solidForegroundVar: '--textarea-solid-foreground',
        },
      })
    })

    describe('highlight', () => {
      it.each(casesHighlight)('aplica highlight=$input como $expected', ({ input, expected }) => {
        const root = mountTextarea({ props: { highlight: input } }).get('[data-test-textarea-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('aplica las clases de variant=$input', ({ input, expected }) => {
        const root = mountTextarea({
          props: { variant: input as TextareaProps['variant'] },
        }).get('[data-test-textarea-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected.classes))
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvía atributos arbitrarios, class y style al textarea raíz',
      id: '[data-test-textarea-root]',
      mount: (attrs) => mountTextarea({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('emite el texto actualizado cuando el usuario edita el textarea', async () => {
        const wrapper = mountTextarea({ props: { modelValue: '' } })

        await wrapper.get('[data-test-textarea-root]').setValue('Mensaje actualizado')

        expect(wrapper.emitted('update:modelValue')).toEqual([['Mensaje actualizado']])
      })
    })
  })

  describe('variantsCss', () => {
    describe('textareaVariants', () => {
      it('mantiene las clases base del textarea', () => {
        const root = mountTextarea().get('[data-test-textarea-root]')

        expect(root.element.tagName).toBe('TEXTAREA')
        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'flex',
            'w-full',
            'outline-none',
            'placeholder:text-muted-foreground',
            'focus-visible:border-(--textarea-color)',
            'focus-visible:ring-3',
            'disabled:cursor-not-allowed',
            'aria-invalid:border-destructive',
          ]),
        )
      })
    })
  })
})
