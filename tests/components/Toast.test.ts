import { i18n } from '@/i18n'
import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  Toast,
  toastVariants,
  toastViewportVariants,
  type ToastProps,
  type ToastContext,
} from '@/components/ui/Toast'
import { ToastRoot, ToastProvider, ToastViewport } from 'reka-ui'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { testButtonConfig } from '../utils/testButtonConfig'
import { testAttrs } from '../utils/testAttrs'

const BOOLEAN_CASES = [undefined, false, true] as const
const TEXT_CASES = [undefined, '', 'Guardado', 'x'.repeat(10)] as const
const NUMBER_CASES = [undefined, 0, -1, 1, 5000, Infinity] as const

const wrappers: ReturnType<typeof mount>[] = []
async function mountToast(options: MountingOptions<ToastProps> = {}) {
  const w = mount(Toast, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [i18n],
      ...options.global,
      stubs: { ToastPortal: { template: '<div><slot /></div>' }, ...options.global?.stubs },
    },
  })
  wrappers.push(w)
  await nextTick()
  await nextTick()
  return w
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  document.body.innerHTML = ''
  vi.useRealTimers()
})
const root = (w: Awaited<ReturnType<typeof mountToast>>) => w.getComponent(ToastRoot)
describe('Toast', () => {
  describe('propiedades', () => {
    describe('variant', () => {
      it.each([
        undefined,
        'solid',
        'outline',
        'plain',
        'subtle',
        'soft',
      ] as ToastProps['variant'][])(
        'aplica estilos %s y lo pasa al boton de cierre',
        async (variant) => {
          const w = await mountToast({ props: { variant } })
          expect(w.get('[data-test-toast-root]').classes()).toEqual(
            expect.arrayContaining(toastVariants({ variant }).split(' ').filter(Boolean)),
          )
          expect(w.getComponent(Button).props('variant')).toBe(variant ?? 'soft')
        },
      )
    })
    describe('open', () => {
      it.each(BOOLEAN_CASES)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { open: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastRoot).props('open')).toBe(value ?? true)
      })
    })
    describe('type', () => {
      it.each([undefined, 'foreground', 'background'] as const)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { type: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastRoot).props('type')).toBe(value ?? 'foreground')
      })
    })
    describe('duration', () => {
      it.each([0, -1, Infinity])('no se cierra automaticamente con %s', async (duration) => {
        vi.useFakeTimers()
        const w = await mountToast({ props: { duration } })
        await vi.advanceTimersByTimeAsync(10000)
        expect(w.emitted('close')).toBeUndefined()
      })
      it.each(NUMBER_CASES)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { duration: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastRoot).props('duration')).toBe(value ?? 5000)
      })
    })
    describe('disableSwipe', () => {
      it.each(BOOLEAN_CASES)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { disableSwipe: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastProvider).props('disableSwipe')).toBe(value ?? false)
      })
    })
    describe('swipeDirection', () => {
      it.each([undefined, 'up', 'down', 'left', 'right'] as const)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { swipeDirection: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastProvider).props('swipeDirection')).toBe(value ?? 'right')
      })
    })
    describe('swipeThreshold', () => {
      it.each(NUMBER_CASES)('reenvia %s', async (value) => {
        const w = await mountToast({
          props: { swipeThreshold: value },
          slots: { default: () => h('li', 'Contenido') },
        })
        expect(w.getComponent(ToastProvider).props('swipeThreshold')).toBe(value ?? 50)
      })
    })
    describe('severity', () => {
      it.each([
        undefined,
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ] as ToastProps['severity'][])('aplica estilos %s', async (severity) => {
        expect(
          (await mountToast({ props: { severity } })).get('[data-test-toast-root]').classes(),
        ).toEqual(expect.arrayContaining(toastVariants({ severity }).split(' ')))
      })
    })
    describe('position', () => {
      it.each([
        undefined,
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ] as ToastProps['position'][])('aplica la posicion %s', async (position) => {
        const w = await mountToast({ props: { position } })
        for (const c of toastViewportVariants({ position }).split(' '))
          expect(w.get('[data-test-toast-viewport]').classes()).toContain(c)
      })
    })
    describe('color', () => {
      it.each([undefined, '', '#ff0000', 'var(--primary)', 'rgb(0, 1, 2)'])(
        'aplica %s',
        async (color) => {
          expect(
            (
              (await mountToast({ props: { color, severity: 'success' } })).get(
                '[data-test-toast-root]',
              ).element as HTMLElement
            ).style.getPropertyValue('--toast-color'),
          ).toBe(color ?? '')
        },
      )
    })
    for (const prop of ['label', 'description'] as const)
      describe(prop, () => {
        it.each(TEXT_CASES)('renderiza %s', async (value) => {
          const w = await mountToast({ props: { [prop]: value } })
          const node = w.find(`[data-test-toast-${prop === 'label' ? 'title' : prop}]`)
          expect(node.exists()).toBe(Boolean(value))
          if (value) expect(node.text()).toBe(value)
        })
      })
    describe('icon', () => {
      it.each([undefined, { name: 'check' as const }, { name: 'x' as const }])(
        'renderiza %s',
        async (icon) => {
          const w = await mountToast({ props: { icon } })
          expect(w.find('[data-test-toast-icon]').exists()).toBe(Boolean(icon))
          if (icon) expect(w.getComponent(Icon).props('name')).toBe(icon.name)
        },
      )
    })
    describe('closable', () => {
      it.each(BOOLEAN_CASES)('renderiza %s', async (closable) => {
        expect(
          (await mountToast({ props: { closable } })).find('[data-test-toast-close]').exists(),
        ).toBe(closable ?? true)
      })
    })
    describe('closeButton', () => {
      testButtonConfig({
        text: 'reenvia la configuracion del boton y la callback de click',
        id: '[data-test-toast-close]',
        mount: (closeButton) => mountToast({ props: { closeButton } }),
      })
      it.each([undefined, {}, { label: 'Descartar', disabled: true }])(
        'normaliza %s',
        async (closeButton) => {
          const button = (await mountToast({ props: { closeButton } })).getComponent(Button)
          expect(button.props('size')).toBe('icon-xs')
          expect(button.classes()).toContain('size-7')
          expect(button.props('icon')).toBe('x')
          expect(button.props('label')).toBe(closeButton?.label)
          expect(button.attributes('disabled') !== undefined).toBe(closeButton?.disabled ?? false)
          expect(button.attributes('aria-label')).toBeTruthy()
        },
      )
      it('ajusta el botón de icono al tamaño configurado', async () => {
        const button = (await mountToast({ props: { closeButton: { size: 'lg' } } })).getComponent(
          Button,
        )

        expect(button.props('size')).toBe('icon-lg')
        expect(button.classes()).toContain('size-10')
      })
      it('hereda props visuales y permite sobrescrituras locales', async () => {
        const inherited = (
          await mountToast({
            props: { variant: 'solid', severity: 'success', color: '#123456' },
          })
        ).getComponent(Button)
        expect(inherited.props('variant')).toBe('solid')
        expect(inherited.props('severity')).toBe('success')
        expect(inherited.props('color')).toBe('#123456')

        const overridden = (
          await mountToast({
            props: {
              variant: 'solid',
              severity: 'success',
              color: '#123456',
              closeButton: { variant: 'plain', severity: 'error', color: '#abcdef' },
            },
          })
        ).getComponent(Button)
        expect(overridden.props('variant')).toBe('plain')
        expect(overridden.props('severity')).toBe('error')
        expect(overridden.props('color')).toBe('#abcdef')
      })
    })
    describe('progress', () => {
      it.each([undefined, false, true])('renderiza %s', async (progress) => {
        const w = await mountToast({ props: { progress, duration: 1000 } })
        const node = w.find('[data-test-toast-progress]')
        expect(node.exists()).toBe(progress ?? false)
        if (progress) {
          expect(node.attributes('role')).toBe('progressbar')
          expect(node.attributes('aria-valuemin')).toBe('0')
          expect(node.attributes('aria-valuemax')).toBe('1000')
          expect(node.attributes('aria-valuenow')).toBeTruthy()
        }
      })
      it.each([0, Infinity])('se oculta sin cuenta atras para %s', async (duration) => {
        expect(
          (await mountToast({ props: { progress: true, duration } }))
            .find('[data-test-toast-progress]')
            .exists(),
        ).toBe(false)
      })
    })
    describe('hotkey', () => {
      it.each([undefined, [], ['F9'], ['altKey', 'KeyT']])('reenvia %s', async (hotkey) => {
        const viewport = (await mountToast({ props: { hotkey } })).getComponent(ToastViewport)
        expect(viewport.props('hotkey')).toEqual(hotkey ?? ['F8'])
      })
    })
    describe('labelHotkey', () => {
      it.each([undefined, '', 'Avisos ({hotkey})'])('renderiza %s', async (labelHotkey) => {
        const w = await mountToast({ props: { labelHotkey, hotkey: ['altKey', 'KeyT'] } })
        expect(w.getComponent(ToastViewport).props('label')).toBe(
          labelHotkey ?? 'Notifications ({hotkey})',
        )
        expect(w.get('[role="region"]').attributes('aria-label')).toBe(
          (labelHotkey ?? 'Notifications ({hotkey})').replace('{hotkey}', 'alt+T'),
        )
      })
    })
    describe('ui', () => {
      for (const [key, slot] of Object.entries({
        root: 'toast-root',
        iconContainer: 'toast-icon',
        content: 'toast-content',
        label: 'toast-title',
        description: 'toast-description',
        close: 'toast-close',
        progress: 'toast-progress',
        viewport: 'toast-viewport',
      })) {
        testAttrs({
          text: `aplica los atributos de ${key}`,
          id: `[data-test-${slot}]`,
          mount: async (attrs) =>
            await mountToast({
              props: {
                label: 'Titulo',
                description: 'Contenido',
                icon: { name: 'check' },
                progress: key === 'progress',
                ui: { [key]: () => attrs },
              },
            }),
        })
      }
    })
  })
  describe('atributos', () => {
    testAttrs({
      text: 'reenvia los atributos de la raiz',
      id: '[data-test-toast-root]',
      mount: async (attrs) => await mountToast({ attrs }),
    })
  })
  describe('eventos', () => {
    describe('keyboard and timer interactions', () => {
      it.each([false, true])('cancelacion de Escape %s', async (prevent) => {
        const w = await mountToast({
          attrs: {
            onEscapeKeyDown: (event: KeyboardEvent) => {
              if (prevent) event.preventDefault()
            },
          },
        })
        const node = w.get('[data-test-toast-root]')
        ;(node.element as HTMLElement).focus()
        await node.trigger('keydown', { key: 'Escape' })
        expect(w.emitted('escapeKeyDown')).toHaveLength(1)
        expect(w.emitted('close')).toEqual(prevent ? undefined : [[]])
      })
      it('pausa y reanuda al pasar el cursor por el viewport', async () => {
        vi.useFakeTimers()
        const w = await mountToast({ props: { duration: 200 } })
        await w.get('[data-test-toast-viewport]').trigger('pointermove')
        await vi.advanceTimersByTimeAsync(400)
        expect(w.emitted('pause')).toEqual([[]])
        expect(w.emitted('close')).toBeUndefined()
        await w.get('[data-test-toast-viewport]').trigger('pointerleave')
        expect(w.emitted('resume')).toEqual([[]])
        await vi.advanceTimersByTimeAsync(400)
        expect(w.emitted('close')).toEqual([[]])
      })
    })
    describe('update:open', () => {
      it.each([false, true])('reenvia una solicitud a %s', async (value) => {
        const w = await mountToast({ props: { open: !value } })
        root(w).vm.$emit('update:open', value)
        expect(w.emitted('update:open')).toEqual([[value]])
        expect(root(w).props('open')).toBe(!value)
      })
      it('cierra mediante el boton y se reabre externamente', async () => {
        const w = await mountToast({ props: { open: true } })
        await w.get('[data-test-toast-close]').trigger('click')
        expect(w.emitted('update:open')).toEqual([[false]])
        await w.setProps({ open: false })
        await w.setProps({ open: true })
        expect(root(w).props('open')).toBe(true)
        expect(w.emitted('update:open')).toEqual([[false]])
      })
      it('no cierra con closeButton deshabilitado', async () => {
        const w = await mountToast({ props: { closeButton: { disabled: true } } })
        await w.get('[data-test-toast-close]').trigger('click')
        expect(w.emitted('update:open')).toBeUndefined()
      })
    })
    describe('close', () => {
      it('emite una vez al cerrar sin control externo', async () => {
        const w = await mountToast()
        await w.get('[data-test-toast-close]').trigger('click')
        expect(w.emitted('close')).toEqual([[]])
        expect(root(w).props('open')).toBe(false)
      })
      it('observa el cierre externo pero no el estado cerrado inicial', async () => {
        const w = await mountToast({ props: { open: false } })
        expect(w.emitted('close')).toBeUndefined()
        await w.setProps({ open: true })
        await w.setProps({ open: false })
        expect(w.emitted('close')).toEqual([[]])
      })
      it('se cierra automaticamente despues de duration', async () => {
        vi.useFakeTimers()
        const w = await mountToast({ props: { duration: 20 } })
        await nextTick()
        await vi.advanceTimersByTimeAsync(100)
        expect(w.emitted('close')).toEqual([[]])
      })
    })
    for (const event of ['pause', 'resume'] as const)
      describe(event, () => {
        it('reenvia sin payload', async () => {
          const w = await mountToast()
          root(w).vm.$emit(event)
          expect(w.emitted(event)).toEqual([[]])
        })
      })
    for (const event of [
      'escapeKeyDown',
      'swipeStart',
      'swipeMove',
      'swipeCancel',
      'swipeEnd',
    ] as const)
      describe(event, () => {
        it.each([false, true])('conserva payload y cancelacion %s', async (cancelled) => {
          const w = await mountToast()
          const payload =
            event === 'escapeKeyDown'
              ? new KeyboardEvent('keydown', { key: 'Escape', cancelable: true })
              : new CustomEvent(event, {
                  cancelable: true,
                  detail: { originalEvent: new Event('pointermove'), delta: { x: 100, y: 0 } },
                })
          if (cancelled) payload.preventDefault()
          root(w).vm.$emit(event, payload)
          expect(w.emitted(event)).toEqual([[payload]])
          expect(payload.defaultPrevented).toBe(cancelled)
        })
      })
  })
  describe('slots', () => {
    for (const name of ['default', 'icon', 'label', 'description', 'close'] as const)
      describe(name, () => {
        it('renderiza el reemplazo y el contexto', async () => {
          let context: ToastContext | undefined
          const w = await mountToast({
            props: { label: 'Alternativo', description: 'Contenido', icon: { name: 'check' } },
            slots: {
              [name]: (value: ToastContext) => {
                context = value
                return h(
                  name === 'close' ? 'button' : 'div',
                  { 'data-custom': name },
                  `Personalizado ${name}`,
                )
              },
            },
          })
          expect(w.get(`[data-custom="${name}"]`).text()).toBe(`Personalizado ${name}`)
          expect(context?.open).toBe(true)
          expect(context?.close).toBeTypeOf('function')
          if (name === 'default' || name === 'label') expect(w.text()).not.toContain('Alternativo')
          if (name === 'icon') expect(w.find('[data-test-toast-icon] svg').exists()).toBe(false)
        })
      })
    it('suprime el slot close cuando no es cerrable', async () => {
      expect(
        (
          await mountToast({
            props: { closable: false },
            slots: { close: () => h('button', { id: 'custom-close' }) },
          })
        )
          .find('#custom-close')
          .exists(),
      ).toBe(false)
    })
  })
  describe('contrato de contexto', () => {
    it('expone su estado completo y un cierre idempotente', async () => {
      let context!: ToastContext
      const w = await mountToast({
        slots: {
          default: (c: ToastContext) => {
            context = c
            return h('span', 'Contexto')
          },
        },
      })
      expect(context).toEqual({
        open: true,
        close: expect.any(Function),
      })
      context.close()
      await nextTick()
      context.close()
      await nextTick()
      expect(root(w).props('open')).toBe(false)
      expect(w.emitted('update:open')).toEqual([[false]])
    })
  })
})
