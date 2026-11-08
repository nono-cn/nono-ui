import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AspectRatio as RekaAspectRatio } from 'reka-ui'
import { attrsTests, Part, showcase } from '@test'
import { AspectRatio, type AspectRatioProps } from '..'

const ROOT = '[data-test-aspect-ratio-root]'

const ratios = [
  ['16 / 9', 16 / 9],
  ['4 / 3', 4 / 3],
  ['1', 1],
  ['3 / 4', 3 / 4],
  ['9 / 16', 9 / 16],
  ['default', undefined],
  ['null', null],
  ['0', 0],
  ['-1', -1],
  ['NaN', NaN],
  ['Infinity', Infinity],
  ['unknown-ratio', 'unknown-ratio'],
] as [string, AspectRatioProps['ratio']][]

function rekaProps(props: AspectRatioProps = {}) {
  return mount(AspectRatio, { props }).findComponent(RekaAspectRatio).props()
}

describe('AspectRatio', () => {
  describe('props', () => {
    describe('ratio', () => {
      it('passes ratio to reka', () => {
        expect(rekaProps({ ratio: 16 / 9 }).ratio).toBe(16 / 9)
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: AspectRatio,
        root: ROOT,
        class: { value: 'rounded-lg', expected: { borderTopLeftRadius: '8px' } },
        keeps: ['position', 'top', 'right', 'bottom', 'left'],
      })
    })
  })

  showcase({
    stories: {
      Ratio: () => (
        <div class="grid grid-cols-6 items-start gap-4">
          {ratios.map(([name, ratio]) => (
            <Part name={name} caption>
              <AspectRatio ratio={ratio}>
                <div class="flex size-full items-center justify-center rounded-md bg-muted text-sm">
                  {name}
                </div>
              </AspectRatio>
            </Part>
          ))}
        </div>
      ),
    },
  })
})
