import { describe, expect, it } from 'vitest'
import { attrsTests, render, showcase } from '@test'
import { Icon } from '@/components/Icon'
import { Label } from '..'

const ROOT = '[data-test-label-root]'

describe('Label', () => {
  describe('props', () => {
    describe('for', () => {
      it('names the control with that id', async () => {
        const screen = await render(() => [<input id="email" />, <Label for="email">Email</Label>])

        expect(screen.getByLabelText('Email').element()).toBe(
          screen.container.querySelector('#email'),
        )
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('names a nested control without for', async () => {
        const screen = await render(() => (
          <Label>
            Email
            <input id="email" />
          </Label>
        ))

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
      Default: () => <Label>Email</Label>,
      'With icon': () => (
        <Label>
          <Icon name="user" />
          Username
        </Label>
      ),
      'Next to a disabled peer': () => (
        <div class="flex items-center gap-2">
          <input id="peer-disabled" type="checkbox" class="peer" disabled />
          <Label for="peer-disabled">Accept terms</Label>
        </div>
      ),
      'Inside a disabled group': () => (
        <div class="group" data-disabled="true">
          <Label>Email</Label>
        </div>
      ),
      'Long text': () => (
        <div class="w-40">
          <Label>A long label that does not fit on a single line</Label>
        </div>
      ),
    },
  })
})
