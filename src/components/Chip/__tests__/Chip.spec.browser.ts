import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { attrsTests, gridOn, render, showcase } from '@test'
import { themeColors } from '@/components/constants'
import { Chip, chipPositions, chipSizes } from '..'

const ROOT = '[data-test-chip-root]'
const BASE = '[data-test-chip-base]'

const anchor = () => h('div', { class: 'size-10 rounded-full bg-foreground/10' })

async function baseColor(attrs: Record<string, unknown> = {}) {
  const screen = await render(() => h(Chip, { color: 'error', ...attrs }, anchor))

  return getComputedStyle(screen.container.querySelector(BASE)!).backgroundColor
}

describe('Chip', () => {
  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Chip,
        root: ROOT,
        class: { value: 'flex', expected: { display: 'flex' } },
      })

      it('a custom style keeps the chip color', async () => {
        expect(await baseColor({ style: { opacity: '0.5' } })).toBe(await baseColor())
      })
    })
  })

  showcase({
    component: Chip,
    slots: { default: anchor },
    props: {
      size: [...chipSizes, null, 'unknown-size'],
      position: [...chipPositions, null, 'unknown-position'],
      color: [...themeColors, '#6366f1', 'unknown-token'],
      inset: true,
      show: true,
      standalone: true,
    },
    stories: {
      'Position x inset': gridOn(
        chipPositions,
        [false, true],
        (position, inset) => h(Chip, { position, inset }, anchor),
        { captions: true },
      ),
      'Standalone ignores position': gridOn(
        [null],
        chipPositions,
        (_, position) => h(Chip, { standalone: true, position }, anchor),
        { captions: true },
      ),
    },
  })
})
