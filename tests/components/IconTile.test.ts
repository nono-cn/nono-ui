import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import {
  IconTile,
  type IconTileProps,
  type IconTileSeverity,
  type IconTileVariant,
} from '@/components/ui/IconTile'
import { testAttrs } from '../utils/testAttrs'

function mountIconTile(options: MountingOptions<IconTileProps> = {}) {
  return mount(IconTile, options)
}

const casesSeverityVariant = (
  [
    {
      severity: 'primary',
      text: 'text-primary',
      solid: ['bg-primary', 'text-primary-foreground'],
      elevated: ['bg-primary/10', 'ring-primary/20'],
    },
    {
      severity: 'neutral',
      text: 'text-foreground',
      solid: ['bg-foreground', 'text-background'],
      elevated: ['bg-muted', 'ring-foreground/20'],
    },
    {
      severity: 'secondary',
      text: 'text-secondary-foreground',
      solid: ['bg-secondary', 'text-secondary-foreground'],
      elevated: ['bg-secondary/60', 'ring-secondary-foreground/20'],
    },
    {
      severity: 'warning',
      text: 'text-warning',
      solid: ['bg-warning', 'text-warning-foreground'],
      elevated: ['bg-warning/10', 'ring-warning/20'],
    },
    {
      severity: 'success',
      text: 'text-success',
      solid: ['bg-success', 'text-success-foreground'],
      elevated: ['bg-success/10', 'ring-success/20'],
    },
    {
      severity: 'error',
      text: 'text-error',
      solid: ['bg-error', 'text-error-foreground'],
      elevated: ['bg-error/10', 'ring-error/20'],
    },
  ] satisfies {
    severity: IconTileSeverity
    text: string
    solid: string[]
    elevated: string[]
  }[]
).flatMap(({ severity, text, solid, elevated }) =>
  (
    [
      { variant: 'solid', expected: solid },
      {
        variant: 'outline',
        expected: ['border', 'bg-(--icon-tile-surface,transparent)', text],
      },
      { variant: 'elevated', expected: ['border', 'shadow-sm', text, ...elevated] },
      { variant: 'frame', expected: ['border', 'p-1', text] },
    ] satisfies { variant: IconTileVariant; expected: string[] }[]
  ).map(({ variant, expected }) => ({ severity, variant, expected })),
)

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

const casesColorVariant = [
  {
    variant: 'solid',
    expected: ['bg-(--icon-tile-color)', 'text-(--icon-tile-color-foreground)'],
  },
  {
    variant: 'outline',
    expected: [
      'border-(--icon-tile-color)/40',
      'bg-(--icon-tile-surface,transparent)',
      'text-(--icon-tile-color)',
    ],
  },
  {
    variant: 'elevated',
    expected: [
      'border-(--icon-tile-color)/40',
      'bg-(--icon-tile-color)/10',
      'ring-(--icon-tile-color)/20',
      'text-(--icon-tile-color)',
    ],
  },
  {
    variant: 'frame',
    expected: ['border-(--icon-tile-color)/40', 'p-1', 'text-(--icon-tile-color)'],
  },
] satisfies { variant: IconTileVariant; expected: string[] }[]

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
      it.each(casesSeverityVariant)(
        'renders severity=$severity with variant=$variant',
        ({ severity, variant, expected }) => {
          const root = mountIconTile({ props: { iconName: 'info', severity, variant } }).get(
            '[data-test-icon-tile-root]',
          )

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
        },
      )

      it('uses outline with neutral severity by default', () => {
        const root = mountIconTile({ props: { iconName: 'info' } }).get(
          '[data-test-icon-tile-root]',
        )

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'border',
            'bg-(--icon-tile-surface,transparent)',
            'text-foreground',
          ]),
        )
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

    describe('color', () => {
      it.each(casesColorVariant)(
        'applies the custom color with variant=$variant',
        ({ variant, expected }) => {
          const root = mountIconTile({
            props: { iconName: 'info', color: '#123456', variant },
          }).get('[data-test-icon-tile-root]')

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
          expect(root.attributes('style')).toContain('--icon-tile-color: #123456')
          expect(root.attributes('style')).toContain('--icon-tile-color-foreground: #ffffff')
        },
      )
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
