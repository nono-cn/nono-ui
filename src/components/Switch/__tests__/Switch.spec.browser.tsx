import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { SwitchRoot } from 'reka-ui'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test'
import { themeColors } from '@/components/constants'
import { createSwitchContext, Switch, switchDefaults, switchSizes, type SwitchProps } from '..'

const ROOT = '[data-test-switch-root]'
const THUMB = '[data-test-switch-thumb]'

const sizes = switchSizes
const colors = [...themeColors, '#7c3aed']
const states = [
  { name: 'off', props: { modelValue: false } },
  { name: 'on', props: { modelValue: true } },
] as const
const interactions = [
  { name: 'default', props: {} },
  { name: 'focus', props: { 'data-showcase-force': 'focus-visible' } },
  { name: 'disabled', props: { disabled: true } },
] as const
const icons = { uncheckedIcon: 'x', checkedIcon: 'check' } as const
const iconContents = [
  { name: 'checkedIcon', props: { checkedIcon: 'star' } },
  { name: 'uncheckedIcon', props: { uncheckedIcon: 'minus' } },
  { name: 'both', props: { checkedIcon: 'star', uncheckedIcon: 'minus' } },
] as const

function rekaRootProps(props: SwitchProps = {}) {
  return mount(Switch, { props }).findComponent(SwitchRoot).props()
}

describe('Switch', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Switch,
        props: { modelValue: true, checkedIcon: 'check' },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: switchDefaults.size,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Switch,
        props: { modelValue: true, checkedIcon: 'check' },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: switchDefaults.color,
      })
    })

    describe('modelValue', () => {
      it('passes modelValue to reka', () => {
        expect(
          rekaRootProps({ trueValue: 'on', falseValue: 'off', modelValue: 'on' }).modelValue,
        ).toBe('on')
      })
    })

    describe('trueValue', () => {
      it('passes trueValue to reka', () => {
        expect(rekaRootProps({ trueValue: 'on', falseValue: 'off' }).trueValue).toBe('on')
      })
    })

    describe('falseValue', () => {
      it('passes falseValue to reka', () => {
        expect(rekaRootProps({ trueValue: 'on', falseValue: 'off' }).falseValue).toBe('off')
      })
    })

    describe('ui', () => {
      describe('thumb', () => {
        attrsTests({
          component: Switch,
          props: { modelValue: true },
          root: THUMB,
          toProps: (attrs) => ({ ui: { thumb: () => attrs } }),
          class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
          keeps: ['backgroundColor'],
        })

        it('receives the switch context', async () => {
          const thumb = vi.fn(() => ({}))
          await render(Switch, {
            props: { trueValue: 'on', falseValue: 'off', modelValue: 'on', ui: { thumb } },
          })

          expect(thumb).toHaveBeenLastCalledWith(createSwitchContext('on', 'on'))
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('clicking emits the new value', async () => {
        const screen = await render(Switch, {
          props: { trueValue: 'on', falseValue: 'off', modelValue: 'off' },
        })

        await userEvent.click(screen.container.querySelector<HTMLElement>(ROOT)!)

        expect(screen.emitted('update:modelValue')).toEqual([['on']])
      })

      it('changing modelValue from outside does not emit', async () => {
        const screen = await render(Switch, { props: { modelValue: false } })

        await screen.rerender({ modelValue: true })

        expect(screen.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })

  describe('context', () => {
    describe('switchContext', () => {
      it('ui.thumb receives state false when off', async () => {
        const thumb = vi.fn(() => ({}))
        await render(Switch, { props: { ui: { thumb } } })

        expect(thumb).toHaveBeenLastCalledWith({ state: false })
      })

      it('ui.thumb receives state true after turning on', async () => {
        const thumb = vi.fn(() => ({}))
        const screen = await render(Switch, { props: { ui: { thumb } } })

        await userEvent.click(screen.container.querySelector<HTMLElement>(ROOT)!)

        expect(thumb).toHaveBeenLastCalledWith({ state: true })
      })

      it('ui.thumb receives state true when modelValue is the custom trueValue', async () => {
        const thumb = vi.fn(() => ({}))
        await render(Switch, {
          props: { trueValue: 'on', falseValue: 'off', modelValue: 'on', ui: { thumb } },
        })

        expect(thumb).toHaveBeenLastCalledWith({ state: true })
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Switch,
        props: { modelValue: true },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor'],
      })

      it('always renders a button even with as and asChild in attrs', async () => {
        const screen = await render(Switch, { attrs: { as: 'div', asChild: true } })

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
                    <Switch size={size} {...state.props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      'Size x icons': () => (
        <div class="grid gap-3">
          {states.map((state) => (
            <Part name={state.name} title>
              <div class="flex items-end gap-6">
                {sizes.map((size) => (
                  <Part name={`${state.name} / ${size}`} caption={String(size)}>
                    <Switch size={size} {...icons} {...state.props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      Icons: () => (
        <div class="grid gap-3">
          {states.map((state) => (
            <Part name={state.name} title>
              <div class="flex items-end gap-6">
                {iconContents.map((content) => (
                  <Part name={`${state.name} / ${content.name}`} caption={content.name}>
                    <Switch {...content.props} {...state.props} />
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
                      <Switch color={color} {...icons} {...state.props} {...interaction.props} />
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
