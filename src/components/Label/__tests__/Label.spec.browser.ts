import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { attrsTests, render, showcase } from '@test'
import { Icon } from '@/components/Icon'
import { Label } from '..'

const ROOT = '[data-test-label-root]'

describe('Label', () => {
  describe('props', () => {
    describe('for', () => {
      it('names the control with that id', async () => {
        const screen = await render(() => [
          h('input', { id: 'email' }),
          h(Label, { for: 'email' }, () => 'Email'),
        ])

        expect(screen.getByLabelText('Email').element()).toBe(
          screen.container.querySelector('#email'),
        )
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('names a nested control without for', async () => {
        const screen = await render(() =>
          h(Label, null, () => ['Email', h('input', { id: 'email' })]),
        )

        expect(screen.getByLabelText('Email').element()).toBe(
          screen.container.querySelector('#email'),
        )
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Label,
        root: ROOT,
        class: { value: 'text-lg', expected: { fontSize: '18px' } },
      })

      it('is a native label element', async () => {
        const screen = await render(Label)

        expect(screen.container.querySelector(ROOT)?.tagName).toBe('LABEL')
      })
    })
  })

  showcase({
    stories: {
      Default: () => h(Label, null, () => 'Email'),
      'With icon': () => h(Label, null, () => [h(Icon, { name: 'user' }), 'Username']),
      'Next to a disabled peer': () =>
        h('div', { class: 'flex items-center gap-2' }, [
          h('input', { id: 'peer-disabled', type: 'checkbox', class: 'peer', disabled: true }),
          h(Label, { for: 'peer-disabled' }, () => 'Accept terms'),
        ]),
      'Inside a disabled group': () =>
        h('div', { class: 'group', 'data-disabled': 'true' }, [
          h(Label, null, () => 'Email'),
        ]),
      'Long text': () =>
        h('div', { class: 'w-40' }, [
          h(Label, null, () => 'A long label that does not fit on a single line'),
        ]),
    },
  })
})
