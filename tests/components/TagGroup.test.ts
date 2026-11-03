import { mount, type MountingOptions } from '@vue/test-utils'
import { TagGroupRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { TagGroup, type TagGroupProps } from '@/components/TagGroup'
import { i18n } from '@/i18n'

function mountTagGroup(options: MountingOptions<TagGroupProps> = {}) {
  return mount(TagGroup, { ...options, global: { plugins: [i18n] } })
}

describe('TagGroup', () => {
  describe('props', () => {
    describe('modelValue', () => {
      const casesModelValue = [
        {
          text: 'sin modelValue pasa modelValue=undefined a Reka TagGroupRoot',
          input: { selectionMode: 'single' },
          expected: { reka: { modelValue: undefined } },
        },
        {
          text: 'con selectionMode single pasa el valor seleccionado a Reka TagGroupRoot',
          input: { selectionMode: 'single', modelValue: 'vue' },
          expected: { reka: { modelValue: 'vue' } },
        },
        {
          text: 'con selectionMode single y un valor numérico pasa ese número a Reka TagGroupRoot',
          input: { selectionMode: 'single', modelValue: 42 },
          expected: { reka: { modelValue: 42 } },
        },
        {
          text: 'con selectionMode multiple pasa el array de valores seleccionados a Reka TagGroupRoot',
          input: { selectionMode: 'multiple', modelValue: ['vue', 'vite'] },
          expected: { reka: { modelValue: ['vue', 'vite'] } },
        },
      ] as const

      it.each(casesModelValue)('$text', ({ input, expected }) => {
        const tagGroup = mountTagGroup({ props: input })

        expect({
          reka: { modelValue: tagGroup.getComponent(TagGroupRoot).props('modelValue') },
        }).toEqual(expected)
      })
    })
  })
})
