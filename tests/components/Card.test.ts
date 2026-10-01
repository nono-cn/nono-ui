import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Card, type CardProps } from '@/components/ui/Card'
import { testAttrs } from '../utils/testAttrs'

function mountCard(options: MountingOptions<CardProps> = {}) {
  return mount(Card, options)
}

describe('Card', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Account', expected: 'Account' },
        { input: '', expected: '' },
        { input: undefined, expected: undefined },
      ])('renders label=$input', ({ input, expected }) => {
        const card = mountCard({ props: { label: input } })

        expect(card.find('[data-test-card-label]').exists()).toBe(Boolean(expected))
        if (expected) expect(card.get('[data-test-card-label]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Account details', expected: 'Account details' },
        { input: '', expected: '' },
        { input: undefined, expected: undefined },
      ])('renders description=$input', ({ input, expected }) => {
        const card = mountCard({ props: { description: input } })

        expect(card.find('[data-test-card-description]').exists()).toBe(Boolean(expected))
        if (expected) expect(card.get('[data-test-card-description]').text()).toBe(expected)
      })
    })

    it('does not render an empty header', () => {
      expect(mountCard().find('[data-test-card-header]').exists()).toBe(false)
    })

    describe('ui', () => {
      const parts = ['header', 'label', 'description', 'action', 'content', 'footer'] as const

      for (const part of parts) {
        testAttrs({
          text: `forwards id, aria-label, class and style from ui.${part}`,
          id: `[data-test-card-${part}]`,
          mount: (attrs) =>
            mountCard({
              props: {
                label: 'Account',
                description: 'Account details',
                ui: { [part]: () => attrs },
              },
              slots: {
                default: () => 'Content',
                action: () => 'Action',
                footer: () => 'Footer',
              },
            }),
        })
      }

      it('renders without ui', () => {
        expect(
          mountCard({ props: { ui: undefined } })
            .get('[data-test-card-root]')
            .exists(),
        ).toBe(true)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-card-root]',
      mount: (attrs) => mountCard({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot', () => {
        const card = mountCard({
          slots: { default: () => h('span', { 'data-test-card-slot': 'default' }, 'Default') },
        })

        expect(card.get('[data-test-card-slot="default"]').text()).toBe('Default')
        expect(
          card.get('[data-test-card-content]').find('[data-test-card-slot="default"]').exists(),
        ).toBe(true)
      })

      it('does not render an empty content region', () => {
        expect(mountCard().find('[data-test-card-content]').exists()).toBe(false)
      })
    })

    describe('header', () => {
      it('renders the header slot and hides label and description fallbacks', () => {
        const card = mountCard({
          props: { label: 'Account', description: 'Account details' },
          slots: { header: () => h('span', { 'data-test-card-slot': 'header' }, 'Header') },
        })

        expect(card.get('[data-test-card-slot="header"]').text()).toBe('Header')
        expect(card.find('[data-test-card-label]').exists()).toBe(false)
        expect(card.find('[data-test-card-description]').exists()).toBe(false)
      })

      it('keeps the action alongside a custom header', () => {
        const card = mountCard({
          slots: {
            header: () => h('span', 'Header'),
            action: () => h('button', 'Edit'),
          },
        })

        expect(card.get('[data-test-card-header]').text()).toContain('Header')
        expect(card.get('[data-test-card-action]').text()).toBe('Edit')
      })
    })

    describe('label', () => {
      it('renders the label slot and hides the label fallback', () => {
        const card = mountCard({
          props: { label: 'Label fallback' },
          slots: { label: () => h('span', { 'data-test-card-slot': 'label' }, 'Label') },
        })

        expect(card.get('[data-test-card-slot="label"]').text()).toBe('Label')
        expect(card.get('[data-test-card-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('description', () => {
      it('renders the description slot and hides the description fallback', () => {
        const card = mountCard({
          props: { description: 'Description fallback' },
          slots: {
            description: () => h('span', { 'data-test-card-slot': 'description' }, 'Description'),
          },
        })

        expect(card.get('[data-test-card-slot="description"]').text()).toBe('Description')
        expect(card.get('[data-test-card-root]').text()).not.toContain('Description fallback')
      })
    })

    describe('action', () => {
      it('renders the action slot', () => {
        const card = mountCard({
          slots: { action: () => h('span', { 'data-test-card-slot': 'action' }, 'Action') },
        })

        expect(card.get('[data-test-card-slot="action"]').text()).toBe('Action')
        expect(card.get('[data-test-card-header]').exists()).toBe(true)
      })
    })

    describe('footer', () => {
      it('renders the footer slot', () => {
        const card = mountCard({
          slots: { footer: () => h('span', { 'data-test-card-slot': 'footer' }, 'Footer') },
        })

        expect(card.get('[data-test-card-slot="footer"]').text()).toBe('Footer')
      })

      it('does not render an empty footer region', () => {
        expect(mountCard().find('[data-test-card-footer]').exists()).toBe(false)
      })
    })
  })
})
