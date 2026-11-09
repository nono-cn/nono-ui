import { describe } from 'vitest'
import { attrsTests, invalidValueTests, Part, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import { Badge, badgeDefaults, badgeSizes, badgeVariantNames } from '..'

const ROOT = '[data-test-badge-root]'

const sizes = badgeSizes
const variants = badgeVariantNames
const radii = [...themeRadii, 0, 8, '0.25rem']
const colors = [...themeColors, '#6366f1', '#facc15', '#1e3a8a']

describe('Badge', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Badge,
        props: { label: 'Badge', icon: 'check' },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: badgeDefaults.size,
      })
    })

    describe('variant', () => {
      invalidValueTests({
        component: Badge,
        props: { label: 'Badge' },
        root: ROOT,
        prop: 'variant',
        values: [null, 'unknown-variant'],
        fallback: badgeDefaults.variant,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Badge,
        props: { label: 'Badge' },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: badgeDefaults.color,
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Badge,
        props: { label: 'Nuevo' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor'],
      })
    })
  })

  showcase({
    stories: {
      Labels: () => (
        <div class="flex flex-wrap items-end gap-4">
          <Part name="short">
            <Badge label="Badge" />
          </Part>
          <Part name="long">
            <Badge label="A longer badge label" />
          </Part>
        </div>
      ),

      'Size x content': () => (
        <div class="grid gap-3">
          {(
            [
              ['label', {}],
              ['leading icon', { icon: 'check' }],
              ['trailing icon', { trailingIcon: 'x' }],
            ] as const
          ).map(([content, props]) => (
            <Part name={content} title>
              <div class="flex flex-wrap items-end gap-4">
                {sizes.map((size) => (
                  <Part name={`${content} / ${size}`} caption={String(size)}>
                    <Badge label="Badge" size={size} {...props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      'Variant x color': () => (
        <div class="grid gap-3">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="flex flex-wrap items-center gap-3">
                {colors.map((color) => (
                  <Part name={`${variant} / ${color}`}>
                    <Badge label={color} variant={variant} color={color} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Radius: () => (
        <div class="flex flex-wrap items-end gap-4">
          {radii.map((radius) => (
            <Part name={String(radius)} caption>
              <Badge label="Badge" radius={radius} />
            </Part>
          ))}
        </div>
      ),

      Icons: () => (
        <div class="grid gap-3">
          <Part name="icon" title>
            <div class="flex flex-wrap items-end gap-4">
              {(['check', 'info', 'user'] as const).map((icon) => (
                <Part name={`icon / ${icon}`} caption={icon}>
                  <Badge label="Badge" icon={icon} />
                </Part>
              ))}
            </div>
          </Part>
          <Part name="trailingIcon" title>
            <div class="flex flex-wrap items-end gap-4">
              {(['check', 'x', 'chevronDown'] as const).map((icon) => (
                <Part name={`trailingIcon / ${icon}`} caption={icon}>
                  <Badge label="Badge" trailingIcon={icon} />
                </Part>
              ))}
            </div>
          </Part>
        </div>
      ),

      Slots: () => (
        <div class="flex flex-wrap items-end gap-6">
          <Part name="default replaces label" caption>
            <Badge label="Label">{{ default: () => 'Default slot' }}</Badge>
          </Part>
          <Part name="leading replaces icon" caption>
            <Badge label="Badge" icon="check">
              {{ leading: () => <span class="size-2 rounded-full bg-current" /> }}
            </Badge>
          </Part>
          <Part name="trailing replaces trailingIcon" caption>
            <Badge label="Badge" trailingIcon="x">
              {{ trailing: () => <strong>3</strong> }}
            </Badge>
          </Part>
          <Part name="all slots" caption>
            <Badge>
              {{
                leading: () => <span class="size-2 rounded-full bg-current" />,
                default: () => 'Online',
                trailing: () => <strong>3</strong>,
              }}
            </Badge>
          </Part>
        </div>
      ),
    },
  })
})
