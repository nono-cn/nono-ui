import { describe, expect, it } from 'vitest'
import { attrsTests, Part, render, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import { Badge, badgeSizes, badgeVariantNames, type BadgeProps, type BadgeSlots } from '..'

const ROOT = '[data-test-badge-root]'
const ICON = '[data-test-badge-icon]'
const TRAILING_ICON = '[data-test-badge-trailing-icon]'

async function renderBadge(
  props: BadgeProps = {},
  slots: { [K in keyof BadgeSlots]: BadgeSlots[K] } = {},
) {
  const screen = await render(Badge, { props, slots })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!
  const icon = screen.container.querySelector<SVGElement>(ICON)
  const trailingIcon = screen.container.querySelector<SVGElement>(TRAILING_ICON)

  return { screen, root, icon, trailingIcon }
}

const sizes = [...badgeSizes, null, 'unknown-size'] as BadgeProps['size'][]
const variants = [...badgeVariantNames, null, 'unknown-variant'] as BadgeProps['variant'][]
const radii = [...themeRadii, 0, 8, '0.25rem']
const colors = [...themeColors, '#6366f1', '#facc15', '#1e3a8a', 'unknown-token']

describe('Badge', () => {
  describe('slots', () => {
    describe('default', () => {
      it('replaces the label with its content', async () => {
        const { root } = await renderBadge({ label: 'Nuevo' }, { default: () => 'Custom' })

        expect(root.textContent).toBe('Custom')
      })
    })

    describe('leading', () => {
      it('replaces the icon with its content', async () => {
        const { screen, icon } = await renderBadge(
          { label: 'Nuevo', icon: 'check' },
          { leading: () => <span>Leading</span> },
        )

        expect({
          slot: screen.container.textContent?.includes('Leading'),
          icon,
        }).toEqual({ slot: true, icon: null })
      })
    })

    describe('trailing', () => {
      it('replaces the trailing icon with its content', async () => {
        const { screen, trailingIcon } = await renderBadge(
          { label: 'Nuevo', trailingIcon: 'x' },
          { trailing: () => <span>Trailing</span> },
        )

        expect({
          slot: screen.container.textContent?.includes('Trailing'),
          trailingIcon,
        }).toEqual({ slot: true, trailingIcon: null })
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

      'Custom slots': () => (
        <div class="flex">
          <Badge>
            {{
              leading: () => <span class="size-2 rounded-full bg-current" />,
              default: () => 'Online',
              trailing: () => <strong>3</strong>,
            }}
          </Badge>
        </div>
      ),
    },
  })
})
