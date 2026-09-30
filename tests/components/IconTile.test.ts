import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { IconTile, type IconTileProps, type IconTileVariant } from '@/components/ui/IconTile'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountIconTile(options: MountingOptions<IconTileProps> = {}) {
  return mount(IconTile, options)
}

const casesVariant = [
  {
    variant: 'outline',
    expected: ['border', 'border-(--icon-tile-color)/40', 'text-(--icon-tile-color)'],
  },
  {
    variant: 'elevated',
    expected: ['bg-muted', 'ring-background', 'shadow-sm'],
  },
  {
    variant: 'soft',
    expected: ['bg-(--icon-tile-color)/10', 'border-(--icon-tile-color)/20'],
  },
  {
    variant: 'solid',
    expected: ['bg-(--icon-tile-solid)', 'text-(--icon-tile-solid-foreground)'],
  },
  {
    variant: 'frame',
    expected: ['bg-muted', 'p-1', 'before:bg-background', 'text-(--icon-tile-color)'],
  },
] satisfies { variant: IconTileVariant; expected: string[] }[]

const casesSize = [
  { input: 'xs' as const, expected: ['size-6', '[&>svg]:size-3'] },
  { input: 'sm' as const, expected: ['size-8', '[&>svg]:size-4'] },
  { input: 'md' as const, expected: ['size-10', '[&>svg]:size-5'] },
  { input: 'lg' as const, expected: ['size-12', '[&>svg]:size-6'] },
  { input: 'xl' as const, expected: ['size-16', '[&>svg]:size-8'] },
  { input: undefined, expected: ['size-10', '[&>svg]:size-5'] },
]

describe('IconTile', () => {
  describe('props', () => {
    describe('icon', () => {
      it('renders the named icon', () => {
        const icon = mountIconTile({ props: { icon: 'info' } }).get('[data-test-icon-tile-icon]')

        expect(icon.classes()).toContain('lucide-info')
      })
    })

    describe('variant', () => {
      it.each(casesVariant)(
        'renders variant=$variant with the selected color',
        ({ variant, expected }) => {
          const root = mountIconTile({ props: { icon: 'info', color: 'success', variant } }).get(
            '[data-test-icon-tile-root]',
          )

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
          expect(root.attributes('style')).toContain(
            '--icon-tile-color: var(--success, var(--neutral))',
          )
        },
      )

      it('uses outline with neutral color by default', () => {
        const root = mountIconTile({ props: { icon: 'info' } }).get('[data-test-icon-tile-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(casesVariant[0].expected))
        expect(root.attributes('style')).toContain(
          '--icon-tile-color: var(--neutral, var(--neutral))',
        )
      })
    })

    describe('size', () => {
      it.each(casesSize)('renders size=$input', ({ input, expected }) => {
        const root = mountIconTile({ props: { icon: 'info', size: input } }).get(
          '[data-test-icon-tile-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-icon-tile-root]',
        variable: '--icon-tile-radius',
        defaultValue: 'var(--radius-sm, 0.25rem)',
        mount: (radius) =>
          mountIconTile({ props: { icon: 'info', radius: radius as IconTileProps['radius'] } }),
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-icon-tile-root]',
        varColor: '--icon-tile-color',
        defaultColor: 'var(--neutral, var(--neutral))',
        fallbackColor: 'neutral',
        mount: (color) => mountIconTile({ props: { icon: 'info', color } }),
        theme: {
          colors: themeColors,
          foregroundVar: '--icon-tile-color-foreground',
          solidVar: '--icon-tile-solid',
          solidForegroundVar: '--icon-tile-solid-foreground',
        },
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-icon-tile-root]',
      mount: (attrs) => mountIconTile({ props: { icon: 'info' }, attrs }),
    })
  })
})
