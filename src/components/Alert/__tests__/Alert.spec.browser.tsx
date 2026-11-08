import { describe, expect, it, vi } from 'vitest'
import { attrsTests, Part, render, showcase, userEvent } from '@test'
import { Button } from '@/components/Button'
import { themeColors } from '@/components/constants'
import { Alert, alertVariantNames, type AlertProps, type AlertSlots } from '..'

const ROOT = '[data-test-alert-root]'
const ICON = '[data-test-alert-icon]'
const LABEL = '[data-test-alert-label]'
const DESCRIPTION = '[data-test-alert-description]'
const CLOSE_BUTTON = '[data-test-alert-close-button]'

async function renderAlert(
  props: AlertProps = {},
  slots: { [K in keyof AlertSlots]: AlertSlots[K] } = {},
) {
  const screen = await render(Alert, { props: { label: 'Heads up', ...props }, slots })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

const description = 'Check your card details.'
const variants = [...alertVariantNames, null, 'unknown-variant'] as AlertProps['variant'][]
const colors = [...themeColors, '#6366f1', 'unknown-token']

describe('Alert', () => {
  describe('props', () => {
    describe('decorative', () => {
      it('by default is an alert', async () => {
        const { root } = await renderAlert()

        expect(root.getAttribute('role')).toBe('alert')
      })

      it('when decorative has no alert role', async () => {
        const { root } = await renderAlert({ decorative: true })

        expect(root.getAttribute('role')).toBe('none')
      })
    })

    describe('closable', () => {
      it('the close button has the accessible name "Close"', async () => {
        const { screen } = await renderAlert({ closable: true })
        const closeButton = screen.container.querySelector<HTMLElement>(CLOSE_BUTTON)!

        expect(closeButton).toHaveAccessibleName('Close')
      })

      it('clicking close removes the alert', async () => {
        const { screen } = await renderAlert({ closable: true })

        await userEvent.click(screen.getByRole('button', { name: 'Close' }))

        expect(screen.container.querySelector(ROOT)).toBeNull()
      })
    })

    describe('ui', () => {
      describe('label', () => {
        attrsTests({
          component: Alert,
          props: { label: 'Heads up' },
          root: LABEL,
          toProps: (attrs) => ({ ui: { label: () => attrs } }),
          class: { value: 'font-normal', expected: { fontWeight: '400' } },
        })
      })

      describe('description', () => {
        attrsTests({
          component: Alert,
          props: { description },
          root: DESCRIPTION,
          toProps: (attrs) => ({ ui: { description: () => attrs } }),
          class: { value: 'col-start-1', expected: { gridColumnStart: '1' } },
        })
      })
    })
  })

  describe('slots', () => {
    describe('icon', () => {
      it('replaces the icon with its content', async () => {
        const { screen } = await renderAlert({ icon: 'info' }, { icon: () => <span>Custom</span> })

        expect({
          slot: screen.container.textContent?.includes('Custom'),
          icon: screen.container.querySelector(ICON),
        }).toEqual({ slot: true, icon: null })
      })
    })

    describe('label', () => {
      it('replaces the label with its content', async () => {
        const { screen } = await renderAlert({ label: 'Heads up' }, { label: () => 'Custom' })

        expect(screen.container.querySelector(LABEL)?.textContent).toBe('Custom')
      })

      it('shows without the label prop', async () => {
        const { screen } = await renderAlert({ label: undefined }, { label: () => 'Custom' })

        expect(screen.container.querySelector(LABEL)?.textContent).toBe('Custom')
      })
    })

    describe('description', () => {
      it('replaces the description with its content', async () => {
        const { screen } = await renderAlert({ description }, { description: () => 'Custom' })

        expect(screen.container.querySelector(DESCRIPTION)?.textContent).toBe('Custom')
      })

      it('shows without the description prop', async () => {
        const { screen } = await renderAlert({}, { description: () => 'Custom' })

        expect(screen.container.querySelector(DESCRIPTION)?.textContent).toBe('Custom')
      })
    })

    describe('close', () => {
      it('receives a close function', async () => {
        const close = vi.fn()
        await renderAlert({ closable: true }, { close })

        expect(close).toHaveBeenLastCalledWith({ close: expect.any(Function) })
      })

      it('calling close removes the alert', async () => {
        const { screen } = await renderAlert(
          { closable: true },
          { close: ({ close }) => <button onClick={close}>Dismiss</button> },
        )

        await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))

        expect(screen.container.querySelector(ROOT)).toBeNull()
      })
    })
  })

  describe('emits', () => {
    describe('close', () => {
      it('is emitted when the close button is clicked', async () => {
        const { screen } = await renderAlert({ closable: true })

        await userEvent.click(screen.getByRole('button', { name: 'Close' }))

        expect(screen.emitted('close')).toHaveLength(1)
      })

      it('is emitted when the close slot calls close', async () => {
        const { screen } = await renderAlert(
          { closable: true },
          { close: ({ close }) => <button onClick={close}>Dismiss</button> },
        )

        await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))

        expect(screen.emitted('close')).toHaveLength(1)
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Alert,
        props: { label: 'Heads up' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor'],
      })

      it('a custom role wins', async () => {
        const screen = await render(Alert, {
          props: { label: 'Heads up' },
          attrs: { role: 'status' },
        })

        expect(screen.container.querySelector(ROOT)?.getAttribute('role')).toBe('status')
      })
    })
  })

  showcase({
    stories: {
      'Label and description': () => (
        <div class="grid grid-cols-2 gap-4">
          <Part name="short">
            <Alert label="Heads up" description={description} />
          </Part>
          <Part name="long label">
            <Alert
              label="A very long label that does not fit on a single line, so it is cut with an ellipsis at the end instead of wrapping onto a second line like the description does"
              description={description}
            />
          </Part>
          <Part name="long description">
            <Alert
              label="Heads up"
              description="A longer description that wraps onto several lines to show how it flows when there is more to say than fits in one line."
            />
          </Part>
          <Part name="label only">
            <Alert label="Heads up" closable />
          </Part>
          <Part name="description only">
            <Alert description={description} closable />
          </Part>
        </div>
      ),

      'Variant x color': () => (
        <div class="grid gap-4">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="grid w-full grid-cols-2 gap-4">
                {colors.map((color) => (
                  <Part name={`${variant} / ${color}`}>
                    <Alert
                      label={color}
                      description={description}
                      icon="info"
                      closable
                      variant={variant}
                      color={color}
                    />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Icon: () => (
        <div class="grid grid-cols-2 gap-4">
          {(['info', 'check', 'user'] as const).map((icon) => (
            <Part name={icon}>
              <Alert label={icon} description={description} icon={icon} />
            </Part>
          ))}
        </div>
      ),

      Slots: () => (
        <div class="grid grid-cols-2 gap-4">
          <Part name="icon">
            <Alert label="Custom icon slot" description={description}>
              {{ icon: () => <span class="size-2 rounded-full bg-current" /> }}
            </Alert>
          </Part>
          <Part name="close">
            <Alert label="Custom close slot" description={description} closable>
              {{
                close: ({ close }: { close: () => void }) => (
                  <Button label="Dismiss" size="xs" variant="outline" onClick={close} />
                ),
              }}
            </Alert>
          </Part>
        </div>
      ),
    },
  })
})
