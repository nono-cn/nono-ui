import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Attachment, type AttachmentProps } from '@/components/ui/Attachment'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountAttachment(options: MountingOptions<AttachmentProps> = {}) {
  return mount(Attachment, options)
}

const casesOrientation = [
  { input: 'horizontal' as const, expected: 'w-fit' },
  { input: 'vertical' as const, expected: 'w-40' },
]

const casesLabel = [
  { input: 'informe.pdf', expected: 'informe.pdf', exists: true },
  { input: '', expected: undefined, exists: false },
  { input: undefined, expected: undefined, exists: false },
]

const casesDescription = [
  { input: '2.4 MB · PDF', expected: '2.4 MB · PDF', exists: true },
  { input: '', expected: undefined, exists: false },
  { input: undefined, expected: undefined, exists: false },
]

const casesSize = [
  {
    input: 'md' as const,
    expected: { root: 'p-3', media: 'size-10', label: 'text-sm', description: 'text-xs' },
  },
  {
    input: 'sm' as const,
    expected: {
      root: 'p-2.5',
      media: 'size-8',
      label: 'text-xs',
      description: 'text-[11px]',
    },
  },
  {
    input: 'xs' as const,
    expected: {
      root: 'p-2',
      media: 'size-6',
      label: 'text-[11px]',
      description: 'text-[11px]',
    },
  },
]

const casesState = [
  {
    input: 'idle' as const,
    expected: {
      root: ['border-dashed'],
      label: [],
      description: [],
      media: [],
      icon: 'fileText',
      spinning: false,
    },
  },
  {
    input: 'uploading' as const,
    expected: {
      root: [],
      label: ['animate-pulse'],
      description: [],
      media: [],
      icon: 'spinner',
      spinning: true,
    },
  },
  {
    input: 'processing' as const,
    expected: {
      root: [],
      label: ['animate-pulse'],
      description: [],
      media: [],
      icon: 'fileText',
      spinning: false,
    },
  },
  {
    input: 'error' as const,
    expected: {
      root: ['border-error/50', 'bg-error/5', 'text-error'],
      label: [],
      description: ['text-error'],
      media: ['bg-error/10', 'text-error'],
      icon: 'fileText',
      spinning: false,
    },
  },
  {
    input: 'done' as const,
    expected: {
      root: [],
      label: [],
      description: [],
      media: [],
      icon: 'fileText',
      spinning: false,
    },
  },
]

describe('Attachment', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input', ({ input, expected, exists }) => {
        const attachment = mountAttachment({ props: { label: input } })
        const label = attachment.find('[data-test-attachment-label]')

        expect(label.exists()).toBe(exists)
        if (expected) expect(label.text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', ({ input, expected, exists }) => {
        const attachment = mountAttachment({ props: { description: input } })
        const description = attachment.find('[data-test-attachment-description]')

        expect(description.exists()).toBe(exists)
        if (expected) expect(description.text()).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('renderiza orientation=$input', ({ input, expected }) => {
        const root = mountAttachment({ props: { orientation: input } }).get(
          '[data-test-attachment-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const attachment = mountAttachment({
          props: {
            size: input,
            icon: { name: 'fileText' },
            label: 'informe.pdf',
            description: '2.4 MB',
          },
        })

        expect(attachment.get('[data-test-attachment-root]').classes()).toContain(expected.root)
        expect(attachment.get('[data-test-attachment-media]').classes()).toContain(expected.media)
        expect(attachment.get('[data-test-attachment-label]').classes()).toContain(expected.label)
        expect(attachment.get('[data-test-attachment-description]').classes()).toContain(
          expected.description,
        )
      })
    })

    describe('state', () => {
      it.each(casesState)(
        'renderiza state=$input con sus estilos asociados',
        ({ input, expected }) => {
          const attachment = mountAttachment({
            props: {
              state: input,
              label: 'informe.pdf',
              description: '2.4 MB',
              icon: { name: 'fileText' },
            },
          })
          const root = attachment.get('[data-test-attachment-root]')
          const rootClasses = root.classes()
          const labelClasses = attachment.get('[data-test-attachment-label]').classes()
          const descriptionClasses = attachment.get('[data-test-attachment-description]').classes()
          const mediaClasses = attachment.get('[data-test-attachment-media]').classes()
          const iconComponent = attachment.getComponent('[data-test-attachment-icon]')

          for (const className of expected.root) expect(rootClasses).toContain(className)
          for (const className of expected.label) expect(labelClasses).toContain(className)
          for (const className of expected.description) {
            expect(descriptionClasses).toContain(className)
          }
          for (const className of expected.media) expect(mediaClasses).toContain(className)
          expect(root.attributes('data-state')).toBe(input)
          expect(rootClasses.includes('border-dashed')).toBe(input === 'idle')
          expect(labelClasses.includes('animate-pulse')).toBe(
            input === 'uploading' || input === 'processing',
          )
          expect(descriptionClasses.includes('text-error')).toBe(input === 'error')
          expect(mediaClasses.includes('bg-error/10')).toBe(input === 'error')
          expect(iconComponent.props('name')).toBe(expected.icon)
          expect(iconComponent.classes().includes('animate-spin')).toBe(expected.spinning)
        },
      )
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-attachment-icon]',
        mount: (input) => mountAttachment({ props: { icon: input } }),
      })

      testIconSize({
        text: 'hereda el size de Attachment en icon',
        id: '[data-test-attachment-icon]',
        mount: (size) => mountAttachment({ props: { size, icon: { name: 'fileText' } } }),
      })
    })

    describe('ui', () => {
      describe('media', () => {
        testAttrs({
          text: 'pasa los atributos de ui.media',
          id: '[data-test-attachment-media]',
          mount: (attrs) =>
            mountAttachment({
              props: { mediaVariant: 'image', ui: { media: () => attrs } },
              slots: { media: () => 'Contenido multimedia' },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'pasa los atributos de ui.content',
          id: '[data-test-attachment-content]',
          mount: (attrs) =>
            mountAttachment({
              props: {
                label: 'informe.pdf',
                description: '2.4 MB',
                ui: { content: () => attrs },
              },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa los atributos de ui.label',
          id: '[data-test-attachment-label]',
          mount: (attrs) =>
            mountAttachment({
              props: { label: 'informe.pdf', ui: { label: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa los atributos de ui.description',
          id: '[data-test-attachment-description]',
          mount: (attrs) =>
            mountAttachment({
              props: { description: '2.4 MB', ui: { description: () => attrs } },
            }),
        })
      })

      describe('actions', () => {
        testAttrs({
          text: 'pasa los atributos de ui.actions',
          id: '[data-test-attachment-actions]',
          mount: (attrs) =>
            mountAttachment({
              props: { ui: { actions: () => attrs } },
              slots: { actions: () => 'Acciones' },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-attachment-root]',
      mount: (attrs) => mountAttachment({ attrs }),
    })
  })

  describe('slots', () => {
    describe('media', () => {
      it('no usa el slot media para icon', () => {
        const attachment = mountAttachment({
          props: { icon: { name: 'fileText' } },
          slots: { media: () => h('span', { 'data-test-image-slot': '' }, 'Imagen') },
        })

        expect(attachment.find('[data-test-image-slot]').exists()).toBe(false)
        expect(attachment.find('[data-test-attachment-icon]').exists()).toBe(true)
      })

      it('renderiza el slot media para mediaVariant=image', () => {
        const attachment = mountAttachment({
          props: { mediaVariant: 'image' },
          slots: {
            media: () =>
              h('span', { 'data-test-attachment-slot': 'media' }, 'Contenido multimedia'),
          },
        })

        expect(attachment.get('[data-test-attachment-slot="media"]').text()).toBe(
          'Contenido multimedia',
        )
      })
    })

    describe('label', () => {
      it('renderiza el slot label y oculta el valor alternativo', () => {
        const attachment = mountAttachment({
          props: { label: 'Etiqueta alternativa' },
          slots: { label: () => h('span', { 'data-test-attachment-slot': 'label' }, 'Etiqueta') },
        })

        expect(attachment.get('[data-test-attachment-slot="label"]').text()).toBe('Etiqueta')
        expect(attachment.get('[data-test-attachment-root]').text()).not.toContain(
          'Etiqueta alternativa',
        )
      })
    })

    describe('description', () => {
      it('renderiza el slot description y oculta el valor alternativo', () => {
        const attachment = mountAttachment({
          props: { description: 'Descripción alternativa' },
          slots: {
            description: () =>
              h('span', { 'data-test-attachment-slot': 'description' }, 'Descripción'),
          },
        })

        expect(attachment.get('[data-test-attachment-slot="description"]').text()).toBe(
          'Descripción',
        )
        expect(attachment.get('[data-test-attachment-root]').text()).not.toContain(
          'Descripción alternativa',
        )
      })
    })

    describe('actions', () => {
      it('renderiza el slot actions', () => {
        const attachment = mountAttachment({
          slots: {
            actions: () => h('span', { 'data-test-attachment-slot': 'actions' }, 'Acciones'),
          },
        })

        expect(attachment.get('[data-test-attachment-slot="actions"]').text()).toBe('Acciones')
      })
    })
  })
})
