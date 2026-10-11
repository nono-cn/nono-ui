import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Separator as RekaSeparator } from 'reka-ui'
import { h } from 'vue'

import { Separator, type SeparatorProps } from '@/components/ui/Separator'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const casesType = [
  { input: undefined, expected: 'border-solid' },
  { input: 'solid', expected: 'border-solid' },
  { input: 'dashed', expected: 'border-dashed' },
  { input: 'dotted', expected: 'border-dotted' },
] satisfies Array<{ input: SeparatorProps['type']; expected: string }>

const casesSize = [
  {
    input: undefined,
    horizontal: ['h-[2px]', 'border-t-[2px]'],
    vertical: ['w-[2px]', 'border-l-[2px]'],
  },
  { input: 'xs', horizontal: ['h-px', 'border-t'], vertical: ['w-px', 'border-l'] },
  {
    input: 'sm',
    horizontal: ['h-[2px]', 'border-t-[2px]'],
    vertical: ['w-[2px]', 'border-l-[2px]'],
  },
  {
    input: 'md',
    horizontal: ['h-[3px]', 'border-t-[3px]'],
    vertical: ['w-[3px]', 'border-l-[3px]'],
  },
  {
    input: 'lg',
    horizontal: ['h-[4px]', 'border-t-[4px]'],
    vertical: ['w-[4px]', 'border-l-[4px]'],
  },
  {
    input: 'xl',
    horizontal: ['h-[5px]', 'border-t-[5px]'],
    vertical: ['w-[5px]', 'border-l-[5px]'],
  },
] satisfies Array<{
  input: SeparatorProps['size']
  horizontal: string[]
  vertical: string[]
}>

const casesOrientation = [
  {
    input: undefined,
    expected: 'horizontal',
    directionClass: 'flex-row',
  },
  {
    input: 'horizontal',
    expected: 'horizontal',
    directionClass: 'flex-row',
  },
  {
    input: 'vertical',
    expected: 'vertical',
    directionClass: 'flex-col',
  },
] satisfies Array<{
  input: SeparatorProps['orientation']
  expected: NonNullable<SeparatorProps['orientation']>
  directionClass: string
}>

const casesLabel = [
  { input: undefined, visible: false },
  { input: '', visible: false },
  { input: 'OR', visible: true },
] satisfies Array<{ input: SeparatorProps['label']; visible: boolean }>

const casesPosition = [
  { input: undefined, expected: 'justify-center' },
  { input: 'left', expected: 'justify-start' },
  { input: 'center', expected: 'justify-center' },
  { input: 'right', expected: 'justify-end' },
] satisfies Array<{ input: SeparatorProps['position']; expected: string }>

const casesDecorative = [
  {
    input: undefined,
    orientation: 'horizontal',
    expected: true,
    role: 'none',
    ariaOrientation: undefined,
  },
  {
    input: true,
    orientation: 'horizontal',
    expected: true,
    role: 'none',
    ariaOrientation: undefined,
  },
  {
    input: false,
    orientation: 'horizontal',
    expected: false,
    role: 'separator',
    ariaOrientation: undefined,
  },
  {
    input: false,
    orientation: 'vertical',
    expected: false,
    role: 'separator',
    ariaOrientation: 'vertical',
  },
] satisfies Array<{
  input: SeparatorProps['decorative']
  orientation: NonNullable<SeparatorProps['orientation']>
  expected: boolean
  role: string
  ariaOrientation: string | undefined
}>

function mountSeparator(options: MountingOptions<SeparatorProps> = {}) {
  return mount(Separator, options)
}

describe('Separator', () => {
  describe('props', () => {
    describe('color', () => {
      testColor({
        text: 'resuelve el color de la línea',
        id: '[data-test-separator-root]',
        varColor: '--separator-color',
        defaultColor: 'var(--border)',
        fallbackColor: 'neutral',
        theme: {
          colors: themeColors,
          foregroundVar: '--separator-color-foreground',
          solidVar: '--separator-solid',
          solidForegroundVar: '--separator-solid-foreground',
        },
        mount: (color) => mountSeparator({ props: { color } }),
      })

      it('usa el gris del borde cuando color es neutral', () => {
        const root = mountSeparator({ props: { color: 'neutral' } }).get(
          '[data-test-separator-root]',
        )

        expect(root.attributes('style')).toContain('--separator-color: var(--border)')
        expect(root.classes()).toContain('border-(--separator-color)')
      })
    })

    describe('type', () => {
      it.each(casesType)('aplica type=$input a la línea', ({ input, expected }) => {
        const root = mountSeparator({ props: { type: input } }).get('[data-test-separator-root]')

        expect(
          root.classes().filter((value) => /^border-(solid|dashed|dotted)$/.test(value)),
        ).toEqual([expected])
      })
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input al grosor horizontal y vertical',
        ({ input, horizontal, vertical }) => {
          const horizontalRoot = mountSeparator({ props: { size: input } }).get(
            '[data-test-separator-root]',
          )
          const verticalRoot = mountSeparator({
            props: { size: input, orientation: 'vertical' },
          }).get('[data-test-separator-root]')

          expect(horizontalRoot.classes()).toEqual(expect.arrayContaining(horizontal))
          expect(verticalRoot.classes()).toEqual(expect.arrayContaining(vertical))
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a Reka y aplica la disposición $expected',
        ({ input, expected, directionClass }) => {
          const wrapper = mountSeparator({ props: { orientation: input } })

          expect(wrapper.getComponent(RekaSeparator).props('orientation')).toBe(expected)
          expect(wrapper.get('[data-test-separator-root]').classes()).toContain(directionClass)
        },
      )
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input: $visible', ({ input, visible }) => {
        const content = mountSeparator({ props: { label: input } }).find(
          '[data-test-separator-content]',
        )

        expect(content.exists()).toBe(visible)
        if (visible) expect(content.text()).toBe(input)
      })
    })

    describe('position', () => {
      it.each(casesPosition)('alinea position=$input', ({ input, expected }) => {
        const root = mountSeparator({ props: { label: 'OR', position: input } }).get(
          '[data-test-separator-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('decorative', () => {
      it.each(casesDecorative)(
        'pasa decorative=$input a Reka y renderiza role=$role',
        ({ input, orientation, expected, role, ariaOrientation }) => {
          const wrapper = mountSeparator({ props: { decorative: input, orientation } })
          const root = wrapper.get('[data-test-separator-root]')

          expect(wrapper.getComponent(RekaSeparator).props('decorative')).toBe(expected)
          expect(root.attributes('role')).toBe(role)
          expect(root.attributes('aria-orientation')).toBe(ariaOrientation)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-separator-root]',
      mount: (attrs) => mountSeparator({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot en lugar de label', () => {
        const wrapper = mountSeparator({
          props: { label: 'Fallback' },
          slots: {
            default: () => h('strong', { 'data-test-slot-content': '' }, 'Contenido del slot'),
          },
        })
        const content = wrapper.get('[data-test-separator-content]')

        expect(content.get('[data-test-slot-content]').text()).toBe('Contenido del slot')
        expect(content.text()).toBe('Contenido del slot')
        expect(content.text()).not.toContain('Fallback')
      })
    })
  })

  describe('variantsCss', () => {
    describe('separatorVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountSeparator().get('[data-test-separator-root]').classes()).toEqual(
          expect.arrayContaining([
            'flex',
            'shrink-0',
            'items-center',
            'border-(--separator-color)',
          ]),
        )
      })
    })

    describe('separatorContentVariants', () => {
      it('aplica las clases base al contenido', () => {
        expect(
          mountSeparator({ props: { label: 'OR' } })
            .get('[data-test-separator-content]')
            .classes(),
        ).toEqual(
          expect.arrayContaining([
            'relative',
            'bg-background',
            'px-2',
            'text-sm',
            'text-muted-foreground',
            'whitespace-nowrap',
          ]),
        )
      })
    })
  })
})
