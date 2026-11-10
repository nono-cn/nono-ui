import { describe, expect, it } from 'vitest'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test'
import { themeColors } from '@/components/constants'
import {
  Input,
  inputDefaults,
  inputSizes,
  inputVariantNames,
  type InputProps,
  type InputUI,
} from '..'

const ROOT = '[data-test-input-root]'
const FIELD = '[data-test-input-field]'
const LEADING = '[data-test-input-leading]'
const TRAILING = '[data-test-input-trailing]'

async function renderInput(props: InputProps = {}, attrs: Record<string, unknown> = {}) {
  const screen = await render(Input, { props, attrs })
  const field = screen.container.querySelector<HTMLInputElement>(FIELD)!

  return { screen, field }
}

const sizes = inputSizes
const contents = ['icon', 'text addon', 'loading'] as const
const variants = inputVariantNames
const colors = [...themeColors, '#7c3aed']
const focusUi: InputUI = { root: () => ({ 'data-showcase-force': 'focus-within' }) }
const states = [
  { name: 'default', props: {} },
  { name: 'highlight', props: { highlight: true } },
  { name: 'focus', props: { ui: focusUi } },
] as const

describe('Input', () => {
  describe('props', () => {
    describe('size', () => {
      invalidValueTests({
        component: Input,
        props: { icon: 'search', trailingIcon: 'x', modelValue: 'Search' },
        root: ROOT,
        prop: 'size',
        values: [null, 'unknown-size'],
        fallback: inputDefaults.size,
      })
    })

    describe('variant', () => {
      invalidValueTests({
        component: Input,
        props: { icon: 'search', modelValue: 'Search' },
        root: ROOT,
        prop: 'variant',
        values: [null, 'unknown-variant'],
        fallback: inputDefaults.variant,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Input,
        props: { icon: 'search', modelValue: 'Search', highlight: true },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: inputDefaults.color,
      })
    })

    describe('loading', () => {
      it(`by default has no aria-busy (inputDefaults.loading is ${inputDefaults.loading})`, async () => {
        const { field } = await renderInput()

        expect(field.getAttribute('aria-busy')).toBeNull()
      })

      it('while loading marks the field as busy', async () => {
        const { field } = await renderInput({ loading: true })

        expect(field.getAttribute('aria-busy')).toBe('true')
      })

      it('without loading keeps an aria-busy of its own', async () => {
        const { field } = await renderInput({ loading: false }, { 'aria-busy': 'true' })

        expect(field.getAttribute('aria-busy')).toBe('true')
      })
    })

    describe('ui', () => {
      describe('root', () => {
        attrsTests({
          component: Input,
          root: ROOT,
          toProps: (attrs) => ({ ui: { root: () => attrs } }),
          class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
          keeps: ['color'],
        })
      })

      describe('leading', () => {
        attrsTests({
          component: Input,
          props: { icon: 'check' },
          root: LEADING,
          toProps: (attrs) => ({ ui: { leading: () => attrs } }),
          class: { value: 'ms-0', expected: { marginInlineStart: '0px' } },
        })
      })

      describe('trailing', () => {
        attrsTests({
          component: Input,
          props: { trailingIcon: 'x' },
          root: TRAILING,
          toProps: (attrs) => ({ ui: { trailing: () => attrs } }),
          class: { value: 'me-0', expected: { marginInlineEnd: '0px' } },
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('typing emits the new value', async () => {
        const { screen, field } = await renderInput()

        await userEvent.fill(field, 'Hello')

        expect(screen.emitted('update:modelValue')).toEqual([['Hello']])
      })

      it('changing modelValue from outside does not emit', async () => {
        const { screen } = await renderInput({ modelValue: 'Before' })

        await screen.rerender({ modelValue: 'After' })

        expect(screen.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })

  describe('attrs', () => {
    describe('field', () => {
      attrsTests({
        component: Input,
        root: FIELD,
        class: { value: 'px-8', expected: { paddingLeft: '32px', paddingRight: '32px' } },
      })

      it('the attributes do not reach the root', async () => {
        const { screen } = await renderInput({}, { id: 'custom-id', 'data-custom': 'value' })
        const root = screen.container.querySelector<HTMLElement>(ROOT)!

        expect({
          id: root.getAttribute('id'),
          data: root.getAttribute('data-custom'),
        }).toEqual({ id: null, data: null })
      })
    })
  })

  showcase({
    stories: {
      'Size x content': () => (
        <div class="grid gap-3">
          {contents.map((content) => (
            <Part name={content} title>
              <div class="grid w-full grid-cols-5 items-end gap-3">
                {sizes.map((size) => (
                  <Part name={`${content} / ${size}`} caption={String(size)}>
                    {content === 'icon' && (
                      <Input size={size} icon="search" trailingIcon="x" modelValue="Search" />
                    )}
                    {content === 'text addon' && (
                      <Input size={size} modelValue="25.00">
                        {{ leading: () => '$', trailing: () => 'USD' }}
                      </Input>
                    )}
                    {content === 'loading' && (
                      <Input size={size} loading trailingIcon="x" modelValue="Search" />
                    )}
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
      'Leading and trailing': () => (
        <div class="grid grid-cols-3 items-start gap-x-6 gap-y-4">
          <Part name="no addons" caption>
            <Input modelValue="Search" />
          </Part>
          <Part name="icon" caption>
            <Input icon="search" modelValue="Search" />
          </Part>
          <Part name="trailingIcon" caption>
            <Input trailingIcon="x" modelValue="Search" />
          </Part>
          <Part name="icon and trailingIcon" caption>
            <Input icon="search" trailingIcon="x" modelValue="Search" />
          </Part>
          <Part name="leading replaces icon" caption>
            <Input icon="search" modelValue="username">
              {{ leading: () => '@' }}
            </Input>
          </Part>
          <Part name="trailing replaces trailingIcon" caption>
            <Input trailingIcon="x" modelValue="example">
              {{ trailing: () => '.com' }}
            </Input>
          </Part>
        </div>
      ),
      Loading: () => (
        <div class="grid grid-cols-3 items-start gap-x-6 gap-y-4">
          <Part name="loading without icon" caption>
            <Input loading modelValue="Search" />
          </Part>
          <Part name="loading replaces icon" caption>
            <Input loading icon="search" modelValue="Search" />
          </Part>
          <Part name="loading replaces leading slot" caption>
            <Input loading modelValue="username">
              {{ leading: () => '@' }}
            </Input>
          </Part>
          <Part name="loading keeps trailingIcon" caption>
            <Input loading icon="search" trailingIcon="x" modelValue="Search" />
          </Part>
          <Part name="custom loadingIcon" caption>
            <Input loading loadingIcon="upload" modelValue="photo.png" />
          </Part>
          <Part name="loading slot replaces loadingIcon" caption>
            <Input loading loadingIcon="upload" modelValue="photo.png">
              {{ loading: () => '…' }}
            </Input>
          </Part>
        </div>
      ),
      Content: () => (
        <div class="grid grid-cols-2 items-start gap-x-6 gap-y-4">
          <Part name="placeholder" caption>
            <Input icon="search" placeholder="Search projects" />
          </Part>
          <Part name="value" caption>
            <Input icon="search" modelValue="Search" />
          </Part>
          <Part name="long value" caption>
            <Input
              icon="search"
              trailingIcon="x"
              modelValue="A very long value that does not fit inside the field and has to be cut at the edge"
            />
          </Part>
          <Part name="file" caption>
            <Input type="file" />
          </Part>
        </div>
      ),
      'Variant x field state': () => (
        <div class="grid gap-3">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="grid w-full grid-cols-3 gap-3">
                <Part name={`${variant} / disabled`} caption="disabled">
                  <Input variant={variant} icon="search" modelValue="Search" disabled />
                </Part>
                <Part name={`${variant} / invalid`} caption="invalid">
                  <Input variant={variant} icon="search" modelValue="Search" aria-invalid="true" />
                </Part>
                <Part name={`${variant} / invalid + focus`} caption="invalid + focus">
                  <Input
                    variant={variant}
                    icon="search"
                    modelValue="Search"
                    aria-invalid="true"
                    ui={focusUi}
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
                          <Input
                            variant={variant}
                            color={color}
                            icon="search"
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
