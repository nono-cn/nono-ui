import { describe, expect, it, vi } from 'vitest'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test'
import { Button } from '@/components/Button'
import { themeColors } from '@/components/constants'
import { Alert, alertDefaults, alertVariantNames, type AlertProps, type AlertSlots } from '..'

const ROOT = '[data-test-alert-root]'
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
const variants = alertVariantNames
const colors = [...themeColors, '#6366f1']

describe('Alert', () => {
  describe('props', () => {
    describe('variant', () => {
      invalidValueTests({
        component: Alert,
        props: { label: 'Heads up', description, icon: 'info', closable: true },
        root: ROOT,
        prop: 'variant',
        values: [null, 'unknown-variant'],
        fallback: alertDefaults.variant,
      })
    })

    describe('color', () => {
      invalidValueTests({
        component: Alert,
        props: { label: 'Heads up', description, icon: 'info', closable: true },
        root: ROOT,
        prop: 'color',
        values: ['unknown-token'],
        fallback: alertDefaults.color,
      })
    })

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
          <Part name="icon replaces icon">
            <Alert label="Icon slot" description={description} icon="info">
              {{ icon: () => <span class="size-2 rounded-full bg-current" /> }}
            </Alert>
          </Part>
          <Part name="label replaces label">
            <Alert label="Label prop" description={description}>
              {{ label: () => 'Label slot' }}
            </Alert>
          </Part>
          <Part name="label without label prop">
            <Alert description={description}>{{ label: () => 'Label slot' }}</Alert>
          </Part>
          <Part name="description replaces description">
            <Alert label="Heads up" description="Description prop">
              {{ description: () => 'Description slot' }}
            </Alert>
          </Part>
          <Part name="description without description prop">
            <Alert label="Heads up">{{ description: () => 'Description slot' }}</Alert>
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
