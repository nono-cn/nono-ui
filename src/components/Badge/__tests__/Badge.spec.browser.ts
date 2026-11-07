import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { attrsTests, gridOn, render, showcase } from '@test'
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

describe('Badge', () => {
  describe('props', () => {
    describe('label', () => {
      it('shows the label text', async () => {
        const { screen } = await renderBadge({ label: 'Nuevo' })

        await expect.element(screen.getByText('Nuevo')).toBeVisible()
      })
    })

    describe('icon', () => {
      it('hides the icon from assistive technology', async () => {
        const { icon } = await renderBadge({ label: 'Nuevo', icon: 'check' })

        expect(icon?.getAttribute('aria-hidden')).toBe('true')
      })
    })

    describe('trailingIcon', () => {
      it('hides the trailing icon from assistive technology', async () => {
        const { trailingIcon } = await renderBadge({ label: 'Nuevo', trailingIcon: 'x' })

        expect(trailingIcon?.getAttribute('aria-hidden')).toBe('true')
      })
    })
  })

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
          { leading: () => h('span', 'Leading') },
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
          { trailing: () => h('span', 'Trailing') },
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
    component: Badge,
    base: { label: 'Badge' },
    props: {
      size: [...badgeSizes, null, 'unknown-size'],
      variant: [...badgeVariantNames, null, 'unknown-variant'],
      radius: [...themeRadii, 0, 8, '0.25rem'],
      color: [...themeColors, '#6366f1', '#facc15', '#1e3a8a', 'unknown-token'],
      icon: ['check', 'info', 'user'],
      trailingIcon: ['check', 'x', 'chevronDown'],
    },
    stories: {
      'Size x leading icon': gridOn([null], badgeSizes, (_, size) =>
        h(Badge, { label: size, size, icon: 'check' }),
      ),
      'Size x trailing icon': gridOn([null], badgeSizes, (_, size) =>
        h(Badge, { label: size, size, trailingIcon: 'x' }),
      ),
      'Variant x color': gridOn(
        badgeVariantNames,
        [...themeColors, '#6366f1', '#facc15', '#1e3a8a'],
        (variant, color) => h(Badge, { label: color, variant, color }),
      ),
      'Custom slots': () =>
        h(Badge, null, {
          leading: () => h('span', { class: 'size-2 rounded-full bg-current' }),
          default: () => 'Online',
          trailing: () => h('strong', '3'),
        }),
    },
  })
})
