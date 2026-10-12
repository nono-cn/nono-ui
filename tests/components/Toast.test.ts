import { defineComponent, h, nextTick, toRaw } from 'vue'
import { mount } from '@vue/test-utils'
import { ToastProvider, ToastRoot, ToastViewport, type ToastObject } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import {
  Toast,
  type ToastPosition,
  type ToastProps,
  type ToastVariant,
} from '@/components/ui/Toast'
import { themeColors } from '@/components/ui/constants'
import { testColor } from '../utils/testColor'

const casesDuration = [undefined, 0, 1200, Infinity]
const casesForceMount = [undefined, false, true]
const casesOpen = [undefined, false, true]
const casesPosition = [
  { input: undefined, expected: ['bottom-4', 'right-4'] },
  { input: 'top-left', expected: ['top-4', 'left-4'] },
  { input: 'top-center', expected: ['top-4', 'left-1/2', '-translate-x-1/2'] },
  { input: 'top-right', expected: ['top-4', 'right-4'] },
  { input: 'bottom-left', expected: ['bottom-4', 'left-4'] },
  { input: 'bottom-center', expected: ['bottom-4', 'left-1/2', '-translate-x-1/2'] },
  { input: 'bottom-right', expected: ['bottom-4', 'right-4'] },
] satisfies { input: ToastPosition | undefined; expected: string[] }[]
const casesType = [undefined, 'foreground', 'background'] as const
const casesVariant = [
  {
    input: undefined,
    expected: ['border-(--toast-color)/20', 'bg-(--toast-color)/10', 'text-(--toast-color)'],
  },
  {
    input: 'solid',
    expected: ['border-transparent', 'bg-(--toast-solid)', 'text-(--toast-solid-foreground)'],
  },
  {
    input: 'outline',
    expected: ['border-(--toast-color)/40', 'bg-transparent', 'text-(--toast-color)'],
  },
  { input: 'plain', expected: ['border-transparent', 'bg-transparent', 'text-(--toast-color)'] },
  {
    input: 'subtle',
    expected: ['border-(--toast-color)/20', 'bg-(--toast-color)/10', 'text-(--toast-color)'],
  },
  {
    input: 'soft',
    expected: ['border-transparent', 'bg-(--toast-color)/10', 'text-(--toast-color)'],
  },
] satisfies { input: ToastVariant | undefined; expected: string[] }[]
const casesLabel = [
  { input: undefined, expected: undefined },
  { input: 'Guardado', expected: 'Guardado' },
  { input: '', expected: '' },
]
const casesDescription = [
  { input: undefined, expected: undefined },
  { input: 'Cambios guardados', expected: 'Cambios guardados' },
  { input: '', expected: '' },
]
const casesEmits = [
  { name: 'update:open', payload: false },
  { name: 'pause', payload: undefined },
  { name: 'resume', payload: undefined },
  { name: 'escapeKeyDown', payload: new KeyboardEvent('keydown', { key: 'Escape' }) },
  { name: 'swipeStart', payload: new CustomEvent('swipeStart') },
  { name: 'swipeMove', payload: new CustomEvent('swipeMove') },
  { name: 'swipeCancel', payload: new CustomEvent('swipeCancel') },
  { name: 'swipeEnd', payload: new CustomEvent('swipeEnd') },
]

function mountToast(
  props: ToastProps = {},
  labelSlot?: () => ReturnType<typeof h>,
  descriptionSlot?: () => ReturnType<typeof h>,
) {
  return mount(
    defineComponent({
      setup() {
        return () =>
          h(ToastProvider, null, {
            default: () => [
              h(Toast, props, {
                default: () => h('span', 'Contenido'),
                ...(labelSlot ? { label: labelSlot } : {}),
                ...(descriptionSlot ? { description: descriptionSlot } : {}),
              }),
              h(ToastViewport),
            ],
          })
      },
    }),
  )
}

function rootProps(props: ToastProps = {}) {
  const wrapper = mountToast(props)
  const root = wrapper.getComponent(Toast).getComponent(ToastRoot)
  expect(root.vm.$attrs).toHaveProperty('data-test-toast-root')
  return root.props()
}

describe('Toast', () => {
  describe('props', () => {
    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-toast-root]',
        varColor: '--toast-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--toast-color-foreground',
          solidVar: '--toast-solid',
          solidForegroundVar: '--toast-solid-foreground',
        },
        mount: (color) => mountToast({ open: true, color }),
      })
    })

    describe('duration', () => {
      it.each(casesDuration)('pasa duration=%s a Reka', (duration) => {
        expect(rootProps({ duration }).duration).toBe(duration)
      })
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input', async ({ input, expected }) => {
        const wrapper = mountToast({ open: true, label: input })
        await nextTick()
        const title = wrapper.find('[data-test-toast-title]')
        if (expected === undefined) expect(title.exists()).toBe(false)
        else expect(title.text()).toBe(expected)
      })

      it('usa el título del aviso gestionado cuando no hay label', async () => {
        const toast: ToastObject = { id: 'guardado', open: true, updateKey: 0, title: 'Listo' }
        const wrapper = mountToast({ toast })
        await nextTick()
        expect(wrapper.get('[data-test-toast-title]').text()).toBe('Listo')
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', async ({ input, expected }) => {
        const wrapper = mountToast({ open: true, description: input })
        await nextTick()
        const description = wrapper.find('[data-test-toast-description]')
        if (expected === undefined) expect(description.exists()).toBe(false)
        else expect(description.text()).toBe(expected)
      })

      it('usa la descripción del aviso gestionado cuando no hay prop description', async () => {
        const toast: ToastObject = {
          id: 'guardado',
          open: true,
          updateKey: 0,
          description: 'Operación completada',
        }
        const wrapper = mountToast({ toast })
        await nextTick()
        expect(wrapper.get('[data-test-toast-description]').text()).toBe('Operación completada')
      })
    })

    describe('forceMount', () => {
      it.each(casesForceMount)('pasa forceMount=%s a Reka', (forceMount) => {
        expect(rootProps({ forceMount }).forceMount).toBe(forceMount ?? false)
      })
    })

    describe('open', () => {
      it.each(casesOpen)('pasa open=%s a Reka', (open) => {
        expect(rootProps({ open }).open).toBe(open)
      })
    })

    describe('position', () => {
      it.each(casesPosition)('aplica position=$input al aviso', async ({ input, expected }) => {
        const wrapper = mountToast({ open: true, position: input })
        await nextTick()
        const classes = wrapper.get('[data-test-toast-root]').classes()
        expect(classes).toContain('fixed')
        for (const className of expected) expect(classes).toContain(className)
      })
    })

    describe('toast', () => {
      it('pasa undefined si no hay un aviso gestionado', () => {
        expect(rootProps().toast).toBeUndefined()
      })

      it('pasa el mismo aviso gestionado a Reka', () => {
        const toast: ToastObject = { id: 'guardado', open: true, updateKey: 0, title: 'Guardado' }
        expect(toRaw(rootProps({ toast }).toast)).toBe(toast)
      })
    })

    describe('type', () => {
      it.each(casesType)('pasa type=%s a Reka', (type) => {
        expect(rootProps({ type }).type).toBe(type ?? 'foreground')
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('aplica variant=$input en ToastRoot', async ({ input, expected }) => {
        const wrapper = mountToast({ open: true, variant: input })
        await nextTick()
        const classes = wrapper.get('[data-test-toast-root]').classes()
        for (const className of expected) expect(classes).toContain(className)
      })
    })
  })

  describe('attrs', () => {
    it('usa siempre div y asChild=false en ToastRoot', async () => {
      const wrapper = mountToast({ open: true, as: 'button', asChild: true } as ToastProps)
      await nextTick()
      const root = wrapper.getComponent(ToastRoot)
      expect(root.props('as')).toBe('div')
      expect(root.props('asChild')).toBe(false)
      expect(wrapper.get('[data-test-toast-root]').element.tagName).toBe('DIV')
    })

    it('aplica data-test-toast-root y los atributos al elemento del aviso', async () => {
      const wrapper = mountToast({ open: true, id: 'aviso' } as ToastProps)
      await nextTick()
      expect(wrapper.get('[data-test-toast-root]').attributes('id')).toBe('aviso')
    })
  })

  describe('emits', () => {
    for (const { name, payload } of casesEmits) {
      describe(name, () => {
        it('reenvía el evento desde ToastRoot', async () => {
          const wrapper = mountToast(name === 'update:open' ? { open: true } : {})
          const toast = wrapper.getComponent(Toast)
          const root = toast.getComponent(ToastRoot)
          root.vm.$emit(name, payload)
          await nextTick()
          expect(toast.emitted(name)).toEqual(payload === undefined ? [[]] : [[payload]])
        })
      })
    }
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido dentro de ToastRoot', async () => {
        const wrapper = mountToast({ forceMount: true })
        await nextTick()
        expect(wrapper.text()).toContain('Contenido')
      })
    })

    describe('label', () => {
      it('renderiza el slot label y sustituye el texto de la prop label', async () => {
        const wrapper = mountToast({ open: true, label: 'Original' }, () =>
          h('strong', 'Personalizado'),
        )
        await nextTick()
        expect(wrapper.get('[data-test-toast-title] strong').text()).toBe('Personalizado')
        expect(wrapper.get('[data-test-toast-title]').text()).not.toContain('Original')
      })

      it('renderiza el slot aunque no haya prop label', async () => {
        const wrapper = mountToast({ open: true }, () => h('strong', 'Solo slot'))
        await nextTick()
        expect(wrapper.get('[data-test-toast-title] strong').text()).toBe('Solo slot')
      })
    })

    describe('description', () => {
      it('renderiza el slot description y sustituye el texto de la prop description', async () => {
        const wrapper = mountToast({ open: true, description: 'Original' }, undefined, () =>
          h('em', 'Descripción personalizada'),
        )
        await nextTick()
        expect(wrapper.get('[data-test-toast-description] em').text()).toBe(
          'Descripción personalizada',
        )
        expect(wrapper.get('[data-test-toast-description]').text()).not.toContain('Original')
      })

      it('renderiza el slot aunque no haya prop description', async () => {
        const wrapper = mountToast({ open: true }, undefined, () => h('em', 'Solo slot'))
        await nextTick()
        expect(wrapper.get('[data-test-toast-description] em').text()).toBe('Solo slot')
      })
    })
  })
})
