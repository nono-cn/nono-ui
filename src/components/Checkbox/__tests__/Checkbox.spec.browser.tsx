import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CheckboxRoot } from 'reka-ui'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test'
import { themeColors } from '@/components/constants'
import {
  Checkbox,
  checkboxDefaults,
  checkboxSizes,
  createCheckboxContext,
  type CheckboxProps,
} from '..'

const ROOT = '[data-test-checkbox-root]'
const INDICATOR = '[data-test-checkbox-indicator]'

const sizes = checkboxSizes
const colors = [...themeColors, '#7c3aed']
const states = [
  { name: 'unchecked', props: { value: false } },
  { name: 'checked', props: { value: true } },
  { name: 'indeterminate', props: { value: 'indeterminate' } },
] as const
const iconStates = states.filter((state) => state.name !== 'unchecked')
const iconContents = [
  { name: 'default', props: {} },
  { name: 'icon', props: { icon: 'star' } },
  { name: 'indeterminateIcon', props: { indeterminateIcon: 'x' } },
  { name: 'both', props: { icon: 'star', indeterminateIcon: 'x' } },
] as const
const interactions = [
  { name: 'default', props: {} },
  { name: 'focus', props: { 'data-showcase-force': 'focus-visible' } },
  { name: 'disabled', props: { disabled: true } },
  { name: 'invalid', props: { 'aria-invalid': true } },
] as const

function rekaRootProps(props: CheckboxProps = {}) {
  return mount(Checkbox, { props }).findComponent(CheckboxRoot).props()
}

describe('Checkbox', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Checkbox,
        props: { value: true },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: checkboxDefaults.size,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Checkbox,
        props: { value: true },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: checkboxDefaults.color,
      })
    })

    describe('value', () => {
      it('passes value to reka', () => {
        expect(rekaRootProps({ trueValue: 'yes', falseValue: 'no', value: 'yes' }).modelValue).toBe(
          'yes',
        )
      })
    })

    describe('trueValue', () => {
      it('passes trueValue to reka', () => {
        expect(rekaRootProps({ trueValue: 'yes', falseValue: 'no' }).trueValue).toBe('yes')
      })
    })

    describe('falseValue', () => {
      it('passes falseValue to reka', () => {
        expect(rekaRootProps({ trueValue: 'yes', falseValue: 'no' }).falseValue).toBe('no')
      })
    })

    describe('ui', () => {
      describe('indicator', () => {
        attrsTests({
          component: Checkbox,
          props: { value: true },
          root: INDICATOR,
          toProps: (attrs) => ({ ui: { indicator: () => attrs } }),
          class: { value: 'flex', expected: { display: 'flex' } },
          keeps: ['display'],
        })

        it('receives the checkbox context', async () => {
          const indicator = vi.fn(() => ({}))
          await render(Checkbox, {
            props: { trueValue: 'yes', falseValue: 'no', value: 'yes', ui: { indicator } },
          })

          expect(indicator).toHaveBeenLastCalledWith(createCheckboxContext('yes', 'yes'))
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('clicking emits the new value', async () => {
        const screen = await render(Checkbox, {
          props: { trueValue: 'yes', falseValue: 'no', value: 'no' },
        })

        await userEvent.click(screen.container.querySelector<HTMLElement>(ROOT)!)

        expect(screen.emitted('update:value')).toEqual([['yes']])
      })

      it('changing value from outside does not emit', async () => {
        const screen = await render(Checkbox, { props: { value: false } })

        await screen.rerender({ value: true })

        expect(screen.emitted('update:value')).toBeUndefined()
      })
    })
  })

  describe('context', () => {
    describe('checkboxContext', () => {
      it('ui.indicator receives state false when unchecked', async () => {
        const indicator = vi.fn(() => ({}))
        await render(Checkbox, { props: { ui: { indicator } } })

        expect(indicator).toHaveBeenLastCalledWith({ state: false })
      })

      it('ui.indicator receives state true after checking', async () => {
        const indicator = vi.fn(() => ({}))
        const screen = await render(Checkbox, { props: { ui: { indicator } } })

        await userEvent.click(screen.container.querySelector<HTMLElement>(ROOT)!)

        expect(indicator).toHaveBeenLastCalledWith({ state: true })
      })

      it('ui.indicator receives state true when value is the custom trueValue', async () => {
        const indicator = vi.fn(() => ({}))
        await render(Checkbox, {
          props: { trueValue: 'yes', falseValue: 'no', value: 'yes', ui: { indicator } },
        })

        expect(indicator).toHaveBeenLastCalledWith({ state: true })
      })

      it('ui.indicator receives state indeterminate when value is indeterminate', async () => {
        const indicator = vi.fn(() => ({}))
        await render(Checkbox, { props: { value: 'indeterminate', ui: { indicator } } })

        expect(indicator).toHaveBeenLastCalledWith({ state: 'indeterminate' })
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Checkbox,
        props: { value: true },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor'],
      })

      it('always renders a button even with as and asChild in attrs', async () => {
        const screen = await render(Checkbox, { attrs: { as: 'div', asChild: true } })

        expect(screen.container.querySelector(ROOT)!.tagName).toBe('BUTTON')
      })
    })
  })

  showcase({
    stories: {
      'Size x state': () => (
        <div class="grid gap-3">
          {states.map((state) => (
            <Part name={state.name} title>
              <div class="flex items-end gap-6">
                {sizes.map((size) => (
                  <Part name={`${state.name} / ${size}`} caption={String(size)}>
                    <Checkbox size={size} {...state.props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      Icons: () => (
        <div class="grid gap-3">
          {iconStates.map((state) => (
            <Part name={state.name} title>
              <div class="flex items-end gap-6">
                {iconContents.map((content) => (
                  <Part name={`${state.name} / ${content.name}`} caption={content.name}>
                    <Checkbox {...content.props} {...state.props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      'Color x state x interaction': () => (
        <div class="grid gap-3">
          {interactions.flatMap((interaction) =>
            states.map((state) => (
              <Part name={`${state.name} / ${interaction.name}`} title>
                <div class="flex items-end gap-6">
                  {colors.map((color) => (
                    <Part name={`${state.name} / ${interaction.name} / ${color}`} caption={color}>
                      <Checkbox color={color} {...state.props} {...interaction.props} />
                    </Part>
                  ))}
                </div>
              </Part>
            )),
          )}
        </div>
      ),
    },
  })
})
