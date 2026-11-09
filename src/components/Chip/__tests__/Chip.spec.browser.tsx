import { describe, expect, it } from 'vitest'
import { attrsTests, invalidValueTests, Part, render, showcase } from '@test'
import { themeColors } from '@/components/constants'
import { Chip, chipDefaults, chipPositions, chipSizes } from '..'

const ROOT = '[data-test-chip-root]'
const BASE = '[data-test-chip-base]'

const anchor = () => <div class="size-10 rounded-full bg-foreground/10" />

async function baseColor(attrs: Record<string, unknown> = {}) {
  const screen = await render(() => (
    <Chip color="error" {...attrs}>
      {anchor()}
    </Chip>
  ))

  return getComputedStyle(screen.container.querySelector(BASE)!).backgroundColor
}

const sizes = chipSizes
const positions = chipPositions
const colors = [...themeColors, '#6366f1']

describe('Chip', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Chip,
        slots: { default: anchor },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: chipDefaults.size,
      })
    })

    describe('position', () => {
      invalidValueTests({
        component: Chip,
        slots: { default: anchor },
        root: ROOT,
        prop: 'position',
        values: [null, 'unknown-position'],
        fallback: chipDefaults.position,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Chip,
        slots: { default: anchor },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: chipDefaults.color,
      })
    })
  })

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
    stories: {
      Size: () => (
        <div class="flex flex-wrap items-end gap-6">
          {sizes.map((size) => (
            <Part name={String(size)} caption>
              <Chip size={size}>{anchor()}</Chip>
            </Part>
          ))}
        </div>
      ),

      'Position x inset': () => (
        <div class="grid gap-3">
          {[false, true].map((inset) => (
            <Part name={`inset ${inset}`} title>
              <div class="flex flex-wrap items-end gap-6">
                {positions.map((position) => (
                  <Part name={`inset ${inset} / ${position}`} caption={String(position)}>
                    <Chip position={position} inset={inset}>
                      {anchor()}
                    </Chip>
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Color: () => (
        <div class="flex flex-wrap items-end gap-6">
          {colors.map((color) => (
            <Part name={color} caption>
              <Chip color={color}>{anchor()}</Chip>
            </Part>
          ))}
        </div>
      ),

      Show: () => (
        <div class="flex flex-wrap items-end gap-6">
          {[true, false].map((show) => (
            <Part name={`show ${show}`} caption>
              <Chip show={show}>{anchor()}</Chip>
            </Part>
          ))}
        </div>
      ),

      'Standalone ignores position': () => (
        <div class="flex flex-wrap items-end gap-6">
          {chipPositions.map((position) => (
            <Part name={position} caption>
              <Chip standalone position={position}>
                {anchor()}
              </Chip>
            </Part>
          ))}
        </div>
      ),
    },
  })
})
