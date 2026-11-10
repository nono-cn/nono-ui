import { describe, expect, it } from 'vitest'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test'
import { themeColors } from '@/components/constants'
import {
  Textarea,
  textareaDefaults,
  textareaSizes,
  textareaVariantNames,
  type TextareaProps,
} from '..'

const ROOT = '[data-test-textarea-root]'

const sizes = textareaSizes
const contents = [
  { name: 'placeholder', props: { placeholder: 'Write a message' } },
  { name: 'value', props: { modelValue: 'Write a message' } },
  { name: 'multiline value', props: { modelValue: 'First line\nSecond line\nThird line' } },
] as const
const autoresizes = [false, true] as const
const autoresizeContents = [
  { name: 'empty', value: '' },
  { name: 'short value', value: 'Write a message' },
  { name: 'multiline value', value: 'First line\nSecond line\nThird line\nFourth line\nFifth line' },
] as const
const variants = textareaVariantNames
const colors = [...themeColors, '#7c3aed']
const focus = { 'data-showcase-force': 'focus-visible' }
const states = [
  { name: 'default', props: {} },
  { name: 'highlight', props: { highlight: true } },
  { name: 'focus', props: focus },
] as const

async function renderTextarea(props: TextareaProps = {}) {
  const screen = await render(Textarea, { props })
  const root = screen.container.querySelector<HTMLTextAreaElement>(ROOT)!

  return { screen, root }
}

describe('Textarea', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Textarea,
        props: { modelValue: 'Write a message' },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: textareaDefaults.size,
      })
    })

    describe('variant', () => {
      invalidValueTests({
        component: Textarea,
        props: { modelValue: 'Write a message' },
        root: ROOT,
        prop: 'variant',
        values: [null, 'unknown-variant'],
        fallback: textareaDefaults.variant,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Textarea,
        props: { modelValue: 'Write a message', highlight: true },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: textareaDefaults.color,
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('typing emits the new value', async () => {
        const { screen, root } = await renderTextarea()

        await userEvent.fill(root, 'Hello')

        expect(screen.emitted('update:modelValue')).toEqual([['Hello']])
      })

      it('changing modelValue from outside does not emit', async () => {
        const { screen } = await renderTextarea({ modelValue: 'Before' })

        await screen.rerender({ modelValue: 'After' })

        expect(screen.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Textarea,
        props: { highlight: true },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['borderColor'],
      })
    })
  })

  showcase({
    stories: {
      'Size x content': () => (
        <div class="grid gap-3">
          {contents.map((content) => (
            <Part name={content.name} title>
              <div class="grid w-full grid-cols-5 items-end gap-3">
                {sizes.map((size) => (
                  <Part name={`${content.name} / ${size}`} caption={String(size)}>
                    <Textarea size={size} {...content.props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      Autoresize: () => (
        <div class="grid gap-3">
          {autoresizes.map((autoresize) => (
            <Part name={`autoresize ${autoresize}`} title>
              <div class="grid w-full grid-cols-3 items-start gap-3">
                {autoresizeContents.map((content) => (
                  <Part name={`autoresize ${autoresize} / ${content.name}`} caption={content.name}>
                    <Textarea autoresize={autoresize} modelValue={content.value} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      'Variant x field state': () => (
        <div class="grid gap-3">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="grid w-full grid-cols-3 gap-3">
                <Part name={`${variant} / disabled`} caption="disabled">
                  <Textarea variant={variant} modelValue="Write a message" disabled />
                </Part>
                <Part name={`${variant} / invalid`} caption="invalid">
                  <Textarea variant={variant} modelValue="Write a message" aria-invalid="true" />
                </Part>
                <Part name={`${variant} / invalid + focus`} caption="invalid + focus">
                  <Textarea
                    variant={variant}
                    modelValue="Write a message"
                    aria-invalid="true"
                    {...focus}
                  />
                </Part>
              </div>
            </Part>
          ))}
        </div>
      ),
      'Variant x color x state': () => (
        <div class="grid gap-6">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="grid w-full gap-3">
                {states.map((state) => (
                  <Part name={`${variant} / ${state.name}`} title={state.name}>
                    <div class="grid w-full grid-cols-7 gap-3">
                      {colors.map((color) => (
                        <Part name={`${variant} / ${state.name} / ${color}`}>
                          <Textarea
                            variant={variant}
                            color={color}
                            modelValue={color}
                            {...state.props}
                          />
                        </Part>
                      ))}
                    </div>
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
    },
  })
})
