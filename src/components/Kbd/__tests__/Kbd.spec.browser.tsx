import { describe, expect, it } from 'vitest'
import { attrsTests, invalidValueTests, Part, render, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import { Kbd, kbdDefaults, kbdSizes, kbdVariantNames, type KbdProps } from '..'

const ROOT = '[data-test-kbd-root]'

async function renderKbd(props: KbdProps = {}) {
  const screen = await render(Kbd, { props })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

const labels = ['K', 'Esc', 'Enter', '⌘']
const sizes = kbdSizes
const variants = kbdVariantNames
const radii = [...themeRadii, 0, 8, '0.25rem']
const colors = [...themeColors, '#6366f1', '#facc15', '#1e3a8a']

describe('Kbd', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Kbd,
        props: { label: 'Enter' },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: kbdDefaults.size,
      })
    })

    describe('variant', () => {
      invalidValueTests({
        component: Kbd,
        props: { label: 'Enter' },
        root: ROOT,
        prop: 'variant',
        values: [null, 'unknown-variant'],
        fallback: kbdDefaults.variant,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Kbd,
        props: { label: 'Enter' },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: kbdDefaults.color,
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
    stories: {
      'Size x label': () => (
        <div class="grid gap-3">
          {labels.map((label) => (
            <Part name={label} title>
              <div class="flex flex-wrap items-end gap-4">
                {sizes.map((size) => (
                  <Part name={`${label} / ${size}`} caption={String(size)}>
                    <Kbd label={label} size={size} />
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
              <div class="flex flex-wrap items-end gap-4">
                {colors.map((color) => (
                  <Part name={`${variant} / ${color}`} caption={color}>
                    <Kbd label="K" variant={variant} color={color} />
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
              <Kbd label="K" radius={radius} />
            </Part>
          ))}
        </div>
      ),

      Slots: () => (
        <div class="flex flex-wrap items-end gap-6">
          <Part name="default replaces label" caption>
            <Kbd label="Enter">Esc</Kbd>
          </Part>
          <Part name="default with markup" caption>
            <Kbd>
              <span class="size-2 rounded-full bg-current" />
              Shift
            </Kbd>
          </Part>
        </div>
      ),
    },
  })
})
