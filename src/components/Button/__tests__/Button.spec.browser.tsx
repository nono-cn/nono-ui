import { describe, expect, it, vi } from 'vitest'
import { attrsTests, Part, render, showcase, userEvent } from '@test'
import { ButtonGroup, buttonGroupSizes } from '@/components/ButtonGroup'
import { themeColors, themeRadii } from '@/components/constants'
import {
  Button,
  buttonDefaults,
  buttonIconSizes,
  buttonTextSizes,
  buttonVariantNames,
  type ButtonProps,
} from '..'

const ROOT = '[data-test-button-root]'

const invalidVariants = [null, 'unknown-variant'] as unknown as ButtonProps['variant'][]
const sizes = [...buttonTextSizes, null, 'unknown-size'] as ButtonProps['size'][]
const colors = [...themeColors, '#6366f1']
const radii = [...themeRadii, 0, 8, '0.25rem']
const contents = [
  ['label', {}],
  ['icon', { icon: 'check' }],
  ['trailingIcon', { trailingIcon: 'x' }],
  ['both icons', { icon: 'check', trailingIcon: 'x' }],
] as const
const states: { name: string; force?: string; disabled?: boolean; loading?: boolean }[] = [
  { name: 'default' },
  { name: 'hover', force: 'hover' },
  { name: 'focus-visible', force: 'focus-visible' },
  { name: 'active', force: 'active' },
  { name: 'disabled', disabled: true },
  { name: 'loading', loading: true },
]

async function renderButton(props: ButtonProps = {}) {
  const screen = await render(Button, { props: { label: 'Save', ...props } })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

function stateAttributes(root: HTMLElement) {
  return {
    root: {
      disabled: root.getAttribute('disabled'),
      ariaDisabled: root.getAttribute('aria-disabled'),
      ariaBusy: root.getAttribute('aria-busy'),
    },
  }
}

describe('Button', () => {
  describe('props', () => {
    describe('as', () => {
      const casesAs = [
        {
          text: `by default is a ${buttonDefaults.as} with type="button"`,
          input: {},
          expected: { root: { tagName: buttonDefaults.as.toUpperCase(), type: 'button' } },
        },
        {
          text: 'as a link has no type',
          input: { as: 'a' },
          expected: { root: { tagName: 'A', type: null } },
        },
        {
          text: 'as a div has no type',
          input: { as: 'div' },
          expected: { root: { tagName: 'DIV', type: null } },
        },
      ] as const

      it.each(casesAs)('$text', async ({ input, expected }) => {
        const { root } = await renderButton(input)

        expect({ root: { tagName: root.tagName, type: root.getAttribute('type') } }).toEqual(
          expected,
        )
      })
    })

    describe('disabled', () => {
      const casesDisabled = [
        {
          text: 'by default is not disabled',
          input: {},
          expected: { root: { disabled: null, ariaDisabled: null, ariaBusy: null } },
        },
        {
          text: 'as a native button uses the disabled attribute',
          input: { disabled: true },
          expected: { root: { disabled: '', ariaDisabled: null, ariaBusy: null } },
        },
        {
          text: 'as a link uses aria-disabled instead of disabled',
          input: { disabled: true, as: 'a' },
          expected: { root: { disabled: null, ariaDisabled: 'true', ariaBusy: null } },
        },
        {
          text: 'as a div uses aria-disabled instead of disabled',
          input: { disabled: true, as: 'div' },
          expected: { root: { disabled: null, ariaDisabled: 'true', ariaBusy: null } },
        },
      ] as const

      it.each(casesDisabled)('$text', async ({ input, expected }) => {
        const { root } = await renderButton(input)

        expect(stateAttributes(root)).toEqual(expected)
      })
    })

    describe('loading', () => {
      const casesLoading = [
        {
          text: `by default is not busy (buttonDefaults.loading is ${buttonDefaults.loading})`,
          input: {},
          expected: { root: { disabled: null, ariaDisabled: null, ariaBusy: null } },
        },
        {
          text: 'is busy and aria-disabled without the native disabled attribute',
          input: { loading: true },
          expected: { root: { disabled: null, ariaDisabled: 'true', ariaBusy: 'true' } },
        },
        {
          text: 'as a div is busy and aria-disabled',
          input: { loading: true, as: 'div' },
          expected: { root: { disabled: null, ariaDisabled: 'true', ariaBusy: 'true' } },
        },
      ] as const

      it.each(casesLoading)('$text', async ({ input, expected }) => {
        const { root } = await renderButton(input)

        expect(stateAttributes(root)).toEqual(expected)
      })
    })
  })

  describe('emits', () => {
    describe('click', () => {
      it('is emitted with the click event', async () => {
        const { screen, root } = await renderButton()

        await userEvent.click(root)

        expect(screen.emitted('click')).toEqual([[expect.any(MouseEvent)]])
      })

      it('is not emitted when disabled as a div', async () => {
        const { screen, root } = await renderButton({ disabled: true, as: 'div' })

        root.click()

        expect(screen.emitted('click')).toBeUndefined()
      })

      it('is not emitted when loading', async () => {
        const { screen, root } = await renderButton({ loading: true })

        root.click()

        expect(screen.emitted('click')).toBeUndefined()
      })

      it('is not emitted with a custom aria-disabled', async () => {
        const screen = await render(Button, {
          props: { label: 'Save' },
          attrs: { 'aria-disabled': 'true' },
        })

        screen.container.querySelector<HTMLElement>(ROOT)!.click()

        expect(screen.emitted('click')).toBeUndefined()
      })

      it('a blocked click does not reach the parent', async () => {
        const onParentClick = vi.fn()
        const screen = await render(() => (
          <div onClick={onParentClick}>
            <Button label="Save" loading />
          </div>
        ))

        screen.container.querySelector<HTMLElement>(ROOT)!.click()

        expect(onParentClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Button,
        props: { label: 'Save' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor', 'borderRadius'],
      })

      const casesAttrs = [
        {
          text: 'a custom type wins over type="button"',
          input: { type: 'submit' },
          expected: { root: { type: 'submit', ariaDisabled: null, ariaBusy: null } },
        },
        {
          text: 'a custom aria-disabled is kept',
          input: { 'aria-disabled': 'true' },
          expected: { root: { type: 'button', ariaDisabled: 'true', ariaBusy: null } },
        },
        {
          text: 'a custom aria-busy is kept without loading',
          input: { 'aria-busy': 'true' },
          expected: { root: { type: 'button', ariaDisabled: null, ariaBusy: 'true' } },
        },
      ] as const

      it.each(casesAttrs)('$text', async ({ input, expected }) => {
        const screen = await render(Button, { props: { label: 'Save' }, attrs: input })
        const root = screen.container.querySelector<HTMLElement>(ROOT)!

        expect({
          root: {
            type: root.getAttribute('type'),
            ariaDisabled: root.getAttribute('aria-disabled'),
            ariaBusy: root.getAttribute('aria-busy'),
          },
        }).toEqual(expected)
      })
    })
  })

  showcase({
    stories: {
      'Variant x color x state': () => (
        <div class="grid gap-6">
          {buttonVariantNames.map((variant) => (
            <Part name={variant} title>
              <div
                class="grid items-center gap-x-4 gap-y-2"
                style={{ gridTemplateColumns: `auto repeat(${states.length}, max-content)` }}
              >
                <span />
                {states.map((state) => (
                  <span class="text-center text-xs text-muted-foreground">{state.name}</span>
                ))}
                {colors.map((color) => [
                  <span class="text-xs text-muted-foreground">{color}</span>,
                  ...states.map((state) => (
                    <Part name={`${variant} / ${color} / ${state.name}`}>
                      <Button
                        label="Button"
                        variant={variant}
                        color={color}
                        disabled={state.disabled}
                        loading={state.loading}
                        data-showcase-force={state.force}
                      />
                    </Part>
                  )),
                ])}
              </div>
            </Part>
          ))}
        </div>
      ),

      'Invalid variant x color': () => (
        <div class="grid gap-3">
          {invalidVariants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="flex flex-wrap items-center gap-3">
                {[...colors, 'unknown-token'].map((color) => (
                  <Part name={`${variant} / ${color}`}>
                    <Button label={color} variant={variant} color={color} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
          <Part name="unknown-token" title>
            <div class="flex flex-wrap items-center gap-3">
              {buttonVariantNames.map((variant) => (
                <Part name={`unknown-token / ${variant}`}>
                  <Button label={variant} variant={variant} color="unknown-token" />
                </Part>
              ))}
            </div>
          </Part>
        </div>
      ),

      'As x state': () => (
        <div class="grid gap-3">
          {(['button', 'a', 'div', 'span'] as const).map((as) => (
            <Part name={as} title>
              <div class="flex flex-wrap items-end gap-4">
                {states
                  .filter((state) => ['default', 'hover', 'active'].includes(state.name))
                  .map((state) => (
                    <Part name={`${as} / ${state.name}`} caption={state.name}>
                      <Button label={as} as={as} data-showcase-force={state.force} />
                    </Part>
                  ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      'Size x content': () => (
        <div class="grid gap-3">
          {contents.map(([content, props]) => (
            <Part name={content} title>
              <div class="flex flex-wrap items-end gap-4">
                {sizes.map((size) => (
                  <Part name={`${content} / ${size}`} caption={String(size)}>
                    <Button label="Button" size={size} {...props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      'Icon sizes': () => (
        <div class="flex flex-wrap items-end gap-4">
          {buttonIconSizes.map((size) => (
            <Part name={size} caption>
              <Button icon="check" size={size} aria-label="Check" />
            </Part>
          ))}
        </div>
      ),

      Radius: () => (
        <div class="flex flex-wrap items-end gap-4">
          {radii.map((radius) => (
            <Part name={String(radius)} caption>
              <Button label="Button" radius={radius} />
            </Part>
          ))}
        </div>
      ),

      'Inside a ButtonGroup': () => (
        <div class="flex flex-wrap items-end gap-6">
          {buttonGroupSizes.map((size) => (
            <Part name={size} caption={`group ${size}`}>
              <ButtonGroup size={size}>
                <Button label="No size" variant="outline" />
                <Button label="Ignores xl" variant="outline" size="xl" />
                <Button icon="check" variant="outline" size="icon-xs" aria-label="Check" />
              </ButtonGroup>
            </Part>
          ))}
        </div>
      ),

      Loading: () => (
        <div class="grid grid-cols-3 items-start gap-x-6 gap-y-4">
          <Part name="loading" caption>
            <Button label="Button" loading />
          </Part>
          <Part name="loading replaces icon" caption>
            <Button label="Button" icon="check" loading />
          </Part>
          <Part name="loading keeps trailingIcon" caption>
            <Button label="Button" trailingIcon="x" loading />
          </Part>
        </div>
      ),

      Slots: () => (
        <div class="grid grid-cols-3 items-start gap-x-6 gap-y-4">
          <Part name="default replaces label" caption>
            <Button label="Label">Default slot</Button>
          </Part>
          <Part name="leading replaces icon" caption>
            <Button label="Button" icon="check">
              {{ leading: () => <span class="size-2 rounded-full bg-current" /> }}
            </Button>
          </Part>
          <Part name="trailing replaces trailingIcon" caption>
            <Button label="Button" trailingIcon="x">
              {{ trailing: () => <strong>3</strong> }}
            </Button>
          </Part>
          <Part name="loading replaces spinner" caption>
            <Button label="Button" loading>
              {{ loading: () => <span>…</span> }}
            </Button>
          </Part>
          <Part name="loading wins over leading" caption>
            <Button label="Button" loading>
              {{ leading: () => <span class="size-2 rounded-full bg-current" /> }}
            </Button>
          </Part>
          <Part name="loading slot hidden when not loading" caption>
            <Button label="Button">{{ loading: () => <span>…</span> }}</Button>
          </Part>
        </div>
      ),
    },
  })
})
