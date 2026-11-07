import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { attrsTests, gridOn, render, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import { Kbd, kbdSizes, kbdVariantNames, type KbdProps, type KbdSlots } from '..'

const ROOT = '[data-test-kbd-root]'

async function renderKbd(props: KbdProps = {}, slots: { [K in keyof KbdSlots]: KbdSlots[K] } = {}) {
  const screen = await render(Kbd, { props, slots })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

describe('Kbd', () => {
  describe('slots', () => {
    describe('default', () => {
      it('replaces the label with its content', async () => {
        const { root } = await renderKbd({ label: 'Enter' }, { default: () => 'Esc' })

        expect(root.textContent).toBe('Esc')
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Kbd,
        props: { label: 'Enter' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor', 'borderRadius'],
      })

      it('is a native kbd element', async () => {
        const { root } = await renderKbd({ label: 'Enter' })

        expect(root.tagName).toBe('KBD')
      })
    })
  })

  showcase({
    component: Kbd,
    base: { label: 'K' },
    props: {
      label: ['K', 'Esc', 'Enter'],
      size: [...kbdSizes, null, 'unknown-size'],
      variant: [...kbdVariantNames, null, 'unknown-variant'],
      radius: [...themeRadii, 0, 8, '0.25rem'],
      color: [...themeColors, '#6366f1', '#facc15', '#1e3a8a', 'unknown-token'],
    },
    stories: {
      'Size x long label': gridOn([null], kbdSizes, (_, size) => h(Kbd, { label: 'Enter', size })),
      'Size x symbol': gridOn([null], kbdSizes, (_, size) => h(Kbd, { label: '⌘', size })),
      'Variant x color': gridOn(
        kbdVariantNames,
        [...themeColors, '#6366f1', '#facc15', '#1e3a8a'],
        (variant, color) => h(Kbd, { label: 'K', variant, color }),
        { captions: true },
      ),
      'Default slot': () =>
        h(Kbd, null, {
          default: () => [h('span', { class: 'size-2 rounded-full bg-current' }), 'Shift'],
        }),
    },
  })
})
