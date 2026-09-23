import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { IconTile, type IconTileProps } from '@/components/ui/IconTile'
import { testAttrs } from '../utils/testAttrs'

function mountIconTile(options: MountingOptions<IconTileProps> = {}) {
  return mount(IconTile, options)
}

const casesVariant = [
  { input: 'solid' as const, expected: 'bg-primary' },
  { input: 'outline' as const, expected: 'bg-(--icon-tile-surface,transparent)' },
  { input: 'elevated' as const, expected: 'shadow-sm' },
  { input: 'frame' as const, expected: 'p-1' },
  { input: undefined, expected: 'bg-(--icon-tile-surface,transparent)' },
]

const casesSize = [
  { input: 'xs' as const, expected: ['size-6', '[&>svg]:size-3'] },
  { input: 'sm' as const, expected: ['size-8', '[&>svg]:size-4'] },
  { input: 'md' as const, expected: ['size-10', '[&>svg]:size-5'] },
  { input: 'lg' as const, expected: ['size-12', '[&>svg]:size-6'] },
  { input: 'xl' as const, expected: ['size-16', '[&>svg]:size-8'] },
  { input: undefined, expected: ['size-10', '[&>svg]:size-5'] },
]

const casesShape = [
  { input: 'rounded' as const, expected: 'rounded-lg' },
  { input: 'full' as const, expected: 'rounded-full' },
  { input: undefined, expected: 'rounded-lg' },
]

describe('IconTile', () => {
  describe('props', () => {
    describe('iconName', () => {
      it('renders the named icon', () => {
        const icon = mountIconTile({ props: { iconName: 'info' } }).get(
          '[data-test-icon-tile-icon]',
        )

        expect(icon.classes()).toContain('lucide-info')
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renders variant=$input', ({ input, expected }) => {
        expect(
          mountIconTile({ props: { iconName: 'info', variant: input } })
            .get('[data-test-icon-tile-root]')
            .classes(),
        ).toContain(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renders size=$input', ({ input, expected }) => {
        const root = mountIconTile({ props: { iconName: 'info', size: input } }).get(
          '[data-test-icon-tile-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('shape', () => {
      it.each(casesShape)('renders shape=$input', ({ input, expected }) => {
        const root = mountIconTile({ props: { iconName: 'info', shape: input } }).get(
          '[data-test-icon-tile-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('severity', () => {
      it.each(['primary', 'secondary', 'warning', 'success', 'error'] as const)(
        'applies severity=%s',
        (severity) => {
          const root = mountIconTile({ props: { iconName: 'info', severity } }).get(
            '[data-test-icon-tile-root]',
          )

          expect(root.classes()).toContain(
            `text-${severity === 'secondary' ? 'secondary-foreground' : severity}`,
          )
        },
      )
    })

    describe('color', () => {
      it('sets the custom color variables and color class', () => {
        const root = mountIconTile({
          props: { iconName: 'info', color: '#123456' },
        }).get('[data-test-icon-tile-root]')

        expect(root.classes()).toContain('text-(--icon-tile-color)')
        expect(root.attributes('style')).toContain('--icon-tile-color: #123456')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-icon-tile-root]',
      mount: (attrs) => mountIconTile({ props: { iconName: 'info' }, attrs }),
    })
  })
})
