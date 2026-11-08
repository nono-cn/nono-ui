import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Separator as RekaSeparator } from 'reka-ui'
import { attrsTests, Part, showcase } from '@test'
import { themeColors } from '@/components/constants'
import {
  Separator,
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
  type SeparatorProps,
} from '..'

const ROOT = '[data-test-separator-root]'

function rekaProps(props: SeparatorProps = {}) {
  return mount(Separator, { props }).findComponent(RekaSeparator).props()
}

const orientations = [
  ...separatorOrientations,
  null,
  'unknown-orientation',
] as SeparatorProps['orientation'][]
const sizes = [...separatorSizes, null, 'unknown-size'] as SeparatorProps['size'][]
const types = [...separatorTypes, null, 'unknown-type'] as SeparatorProps['type'][]
const positions = [
  ...separatorPositions,
  null,
  'unknown-position',
] as SeparatorProps['position'][]
const colors = [...themeColors, '#e11d48', null, 'unknown-color'] as SeparatorProps['color'][]

describe('Separator', () => {
  describe('props', () => {
    describe('decorative', () => {
      it('passes decorative to reka', () => {
        expect(rekaProps({ decorative: true }).decorative).toBe(true)
      })
    })

    describe('orientation', () => {
      it('passes orientation to reka', () => {
        expect(rekaProps({ orientation: 'vertical' }).orientation).toBe('vertical')
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Separator,
        root: ROOT,
        class: { value: 'border-dashed', expected: { borderTopStyle: 'dashed' } },
        keeps: ['borderTopColor'],
      })
    })
  })

  showcase({
    stories: {
      'Size x orientation': () => (
        <div class="grid gap-6">
          {orientations.map((orientation) => (
            <Part name={String(orientation)} title>
              <div class="grid w-full grid-cols-7 gap-4">
                {sizes.map((size) => (
                  <Part name={`${orientation} / ${size}`} caption={String(size)}>
                    <div class="flex h-16 w-full items-center justify-center">
                      <Separator orientation={orientation} size={size} />
                    </div>
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Type: () => (
        <div class="grid grid-cols-5 gap-4">
          {types.map((type) => (
            <Part name={String(type)} caption>
              <Separator type={type} size="md" />
            </Part>
          ))}
        </div>
      ),

      Color: () => (
        <div class="grid grid-cols-4 gap-4">
          {colors.map((color) => (
            <Part name={String(color)} caption>
              <Separator color={color} size="md" />
            </Part>
          ))}
        </div>
      ),

      'Label x position': () => (
        <div class="grid gap-4">
          {positions.map((position) => (
            <Part name={String(position)} title>
              <Separator label="Or" position={position} />
            </Part>
          ))}
        </div>
      ),

      'Label vertical x position': () => (
        <div class="grid grid-cols-5 gap-4">
          {positions.map((position) => (
            <Part name={String(position)} caption>
              <div class="flex h-32 w-full justify-center">
                <Separator orientation="vertical" label="Or" position={position} />
              </div>
            </Part>
          ))}
        </div>
      ),

      Slots: () => (
        <div class="grid grid-cols-2 gap-4">
          <Part name="default replaces label">
            <Separator label="Label prop">
              <span class="font-semibold text-primary">Slot</span>
            </Separator>
          </Part>
          <Part name="default without label prop">
            <Separator>
              <span class="font-semibold text-primary">Slot</span>
            </Separator>
          </Part>
        </div>
      ),
    },
  })
})
