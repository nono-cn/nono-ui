import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'

import {
  Collapsible,
  type CollapsibleContext,
  type CollapsibleProps,
} from '@/components/ui/Collapsible'
import { testAttrs } from '../utils/testAttrs'

function mountCollapsible(options: MountingOptions<CollapsibleProps> = {}) {
  return mount(Collapsible, options)
}
const triggerSlot = () => h('span', 'Abrir')
const buttonSlot = () => h('button', { type: 'button' }, 'Abrir')
const casesOpen = [
  { input: true, expected: 'open' },
  { input: false, expected: 'closed' },
  { input: undefined, expected: 'closed' },
]
const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]
const casesUnmountOnHide = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]
const casesEmittedValues = [
  { input: true, initial: false },
  { input: false, initial: true },
]
const collapsibleContextCases = [
  { input: true, expected: { open: true } },
  { input: false, expected: { open: false } },
  { input: undefined, expected: { open: false } },
]

describe('Collapsible', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesOpen)('renderiza modelValue=$input como $expected', ({ input, expected }) => {
        const w = mountCollapsible({
          props: { modelValue: input },
          slots: { default: triggerSlot },
        })
        expect(w.get('[data-test-collapsible-root]').attributes('data-state')).toBe(expected)
      })
    })
    describe('trigger', () => {
      it('usa asChild=true siempre', () => {
        expect(
          mountCollapsible({ slots: { default: triggerSlot } })
            .getComponent(CollapsibleTrigger)
            .props('asChild'),
        ).toBe(true)
      })
    })
    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input como $expected', ({ input, expected }) => {
        expect(
          mountCollapsible({ props: { disabled: input }, slots: { default: triggerSlot } })
            .getComponent(CollapsibleRoot)
            .props('disabled'),
        ).toBe(expected)
      })
    })
    describe('unmountOnHide', () => {
      it.each(casesUnmountOnHide)(
        'pasa unmountOnHide=$input como $expected',
        ({ input, expected }) => {
          expect(
            mountCollapsible({
              props: { unmountOnHide: input },
              slots: { default: triggerSlot, content: 'Contenido' },
            })
              .getComponent(CollapsibleRoot)
              .props('unmountOnHide'),
          ).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      describe('content', () => {
        testAttrs({
          text: 'resuelve props.ui.content en el content',
          id: '[data-test-collapsible-content]',
          assertId: false,
          mount: (attrs) =>
            mountCollapsible({
              props: { ui: { content: () => attrs } },
              slots: { default: triggerSlot, content: 'Contenido' },
            }),
        })

        it.each(collapsibleContextCases)(
          'entrega el contexto con open=$input al resolver',
          ({ input, expected }) => {
            let context: CollapsibleContext | undefined
            mountCollapsible({
              props: {
                modelValue: input,
                ui: {
                  content: (value) => {
                    context = value
                    return {}
                  },
                },
              },
              slots: { default: buttonSlot, content: 'Contenido' },
            })
            expect(context).toEqual(expected)
          },
        )
      })
    })
  })
  
  describe('attrs', () => {
    testAttrs({
      text: 'reenvia attrs, class y style a la raiz',
      id: '[data-test-collapsible-root]',
      mount: (attrs) => mountCollapsible({ attrs, slots: { default: triggerSlot } }),
    })
  })
  
  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesEmittedValues)('reenvia open=$input', async ({ input, initial }) => {
        const w = mountCollapsible({
          props: { modelValue: initial },
          slots: { default: triggerSlot },
        })
        await w.getComponent(CollapsibleRoot).vm.$emit('update:open', input)
        await nextTick()
        expect(w.emitted('update:modelValue')).toEqual([[input]])
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot por defecto', () => {
        expect(
          mountCollapsible({ slots: { default: () => h('button', 'Default') } }).text(),
        ).toContain('Default')
      })

      it.each(collapsibleContextCases)('entrega el contexto con open=$input', ({ input, expected }) => {
        let context: CollapsibleContext | undefined
        mountCollapsible({
          props: { modelValue: input },
          slots: {
            default: (value: CollapsibleContext) => {
              context = value
              return h('button')
            },
          },
        })
        expect(context).toEqual(expected)
      })
    })

    describe('content', () => {
      it('renderiza content', () => {
        expect(
          mountCollapsible({ slots: { default: triggerSlot, content: 'Contenido' } }).text(),
        ).toContain('Contenido')
      })
      
      it('no renderiza content sin slot', () => {
        expect(
          mountCollapsible({ slots: { default: triggerSlot } })
            .find('[data-test-collapsible-content]')
            .exists(),
        ).toBe(false)
      })
      
      it.each(collapsibleContextCases)('entrega el contexto con open=$input', ({ input, expected }) => {
        let context: CollapsibleContext | undefined
        mountCollapsible({
          props: { modelValue: input },
          slots: {
            default: buttonSlot,
            content: (value: CollapsibleContext) => {
              context = value
              return h('p', 'Contenido')
            },
          },
        })
        expect(context).toEqual(expected)
      })
    })
  })
})
