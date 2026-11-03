import type { ComponentDocConfig } from '../component-docs'
import {
  tagGroupDefaults,
  tagGroupEscapeKeyBehaviors,
  tagGroupSelectionModes,
  tagGroupSizes,
  tagGroupVariantNames,
} from '@/components/TagGroup'
import { formatValue } from '../format-default'
import TagGroupBasicExample from '../../components/examples/tag-group/TagGroupBasicExample.vue'
import TagGroupItemsExample from '../../components/examples/tag-group/TagGroupItemsExample.vue'
import TagGroupEmptyExample from '../../components/examples/tag-group/TagGroupEmptyExample.vue'
import TagGroupSelectionModeExample from '../../components/examples/tag-group/TagGroupSelectionModeExample.vue'
import TagGroupRemovableExample from '../../components/examples/tag-group/TagGroupRemovableExample.vue'
import TagGroupDisallowEmptySelectionExample from '../../components/examples/tag-group/TagGroupDisallowEmptySelectionExample.vue'
import TagGroupEscapeKeyBehaviorExample from '../../components/examples/tag-group/TagGroupEscapeKeyBehaviorExample.vue'
import TagGroupVariantExample from '../../components/examples/tag-group/TagGroupVariantExample.vue'
import TagGroupSizeExample from '../../components/examples/tag-group/TagGroupSizeExample.vue'
import TagGroupRadiusExample from '../../components/examples/tag-group/TagGroupRadiusExample.vue'
import TagGroupColorExample from '../../components/examples/tag-group/TagGroupColorExample.vue'
import TagGroupDisabledExample from '../../components/examples/tag-group/TagGroupDisabledExample.vue'
import TagGroupLoopExample from '../../components/examples/tag-group/TagGroupLoopExample.vue'
import TagGroupSlotsExample from '../../components/examples/tag-group/TagGroupSlotsExample.vue'
import TagGroupUiExample from '../../components/examples/tag-group/TagGroupUiExample.vue'

const toUnion = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')

const tagGroupConfig: ComponentDocConfig = {
  slug: 'tag-group',
  title: 'TagGroup',
  language: 'en',
  description: 'Focusable list of tags that can be selected and removed.',
  importPath: '@nono-ui/components/TagGroup',
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the tags as items and name the group with aria-label.',
      component: TagGroupBasicExample,
    },
  ],
  examples: [
    {
      title: 'Items',
      description:
        'Each item needs a value and can have a label, an icon, and its own disabled state; the value can be a string or a number.',
      component: TagGroupItemsExample,
    },
    {
      title: 'Empty',
      description:
        'Remove every tag to show the empty text; it is only rendered while items is empty.',
      component: TagGroupEmptyExample,
    },
    {
      title: 'Selection mode',
      description:
        'Make tags not selectable, or let the user select one tag or several with v-model.',
      component: TagGroupSelectionModeExample,
    },
    {
      title: 'Removable',
      description:
        'Show a remove button on every tag and drop the emitted values from your items; Delete and Backspace remove the focused tag.',
      component: TagGroupRemovableExample,
    },
    {
      title: 'Disallow empty selection',
      description:
        'Keep at least one tag selected: the last selected tag cannot be deselected, not even with Escape.',
      component: TagGroupDisallowEmptySelectionExample,
    },
    {
      title: 'Escape key behavior',
      description:
        'Focus a tag and press Escape: it clears the selection with clearSelection and does nothing with none.',
      component: TagGroupEscapeKeyBehaviorExample,
    },
    {
      title: 'Variant',
      description: 'Choose how tags and selected tags look: bordered, softly filled, or solid.',
      component: TagGroupVariantExample,
    },
    {
      title: 'Size',
      description: 'Change the height, padding, text, and icon size of the tags.',
      component: TagGroupSizeExample,
    },
    {
      title: 'Radius',
      description: 'Use a Tailwind radius token, a CSS value, or a number of pixels.',
      component: TagGroupRadiusExample,
    },
    {
      title: 'Color',
      description:
        'Choose a theme token or a custom CSS color for selected tags and the focus ring.',
      component: TagGroupColorExample,
    },
    {
      title: 'Disabled',
      description: 'Disable every tag of the group: they cannot be focused or selected.',
      component: TagGroupDisabledExample,
    },
    {
      title: 'Loop',
      description:
        'Focus a tag and use the arrow keys: with loop, focus wraps from the last tag to the first and back.',
      component: TagGroupLoopExample,
    },
    {
      title: 'Slots',
      description:
        'Customize the leading content, the label, and the remove icon of every tag, and what shows when there are no tags.',
      component: TagGroupSlotsExample,
    },
    {
      title: 'UI',
      description:
        'Customize the tag, its label, and its remove button using the context of each tag, and the empty text.',
      component: TagGroupUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'The group is a grid with one row per tag, so assistive technologies announce how many tags there are. Give the group a name with aria-label or aria-labelledby. While focus is inside the group, added tags are announced.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="grid"', 'Root', 'Set while the group has tags; group when it is empty.'],
          ['aria-multiselectable', 'Root', 'true when selectionMode is multiple.'],
          ['aria-live', 'Root', 'polite while focus is inside the group, off otherwise.'],
          ['role="row"', 'Tag', 'Each tag is a row with a single gridcell inside.'],
          ['aria-label', 'Tag', 'The label of the item.'],
          ['aria-selected', 'Tag', 'Whether the tag is selected, unless selectionMode is none.'],
          ['aria-disabled', 'Tag', 'Set on disabled tags.'],
          [
            'aria-labelledby',
            'Remove button',
            'Its own label followed by the tag, so it reads as “Remove Design”.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Only one tag is in the tab order at a time. The arrows skip disabled tags and wrap around while loop is true. In a right-to-left layout ArrowLeft and ArrowRight are swapped.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus into the group, on the last focused tag, or out of it.'],
          ['ArrowRight, ArrowDown', 'Moves focus to the next tag.'],
          ['ArrowLeft, ArrowUp', 'Moves focus to the previous tag.'],
          ['Home', 'Moves focus to the first tag.'],
          ['End', 'Moves focus to the last tag.'],
          ['Space, Enter', 'Toggles the selection of the focused tag.'],
          [
            'Delete, Backspace',
            'Removes the focused tag, or every selected tag when the focused one is selected.',
          ],
          ['Escape', 'Clears the selection, unless escapeKeyBehavior is none.'],
          ['Letters', 'Moves focus to the next tag whose label starts with the typed text.'],
        ],
      },
    },
    {
      title: 'Removing tags',
      description:
        'The component never changes items by itself: remove emits the values to drop and you remove them from your list. Removed values are also taken out of the selection. When the focused tag is removed, focus moves to the next tag, or the previous one when it was the last.',
    },
    {
      title: 'Target size',
      description:
        'The remove button is at least 24 by 24 pixels in every size, so it is easy to hit with a pointer or a finger. This minimum cannot be overridden with ui.delete.',
    },
    {
      title: 'Empty state',
      description:
        'Without tags the root becomes a focusable group instead of a grid, so removing the last tag keeps focus in the group and the empty text is read inside it.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string | number | Array<string | number>',
        default: 'undefined',
        description:
          'Selected value with selectionMode single, or array of selected values with multiple; updated with v-model.',
      },
      {
        name: 'items',
        type: 'TagGroupItem[]',
        typeLink: '#tag-group-item',
        default: '[]',
        description: 'Tags to render, in order.',
      },
      {
        name: 'empty',
        type: 'string',
        default: formatValue(tagGroupDefaults.empty),
        description: 'Text shown while items is empty. The empty slot replaces it.',
      },
      {
        name: 'selectionMode',
        type: toUnion(tagGroupSelectionModes),
        default: formatValue(tagGroupDefaults.selectionMode),
        description: 'Whether tags can be selected, one at a time or several.',
      },
      {
        name: 'removable',
        type: 'boolean',
        default: formatValue(tagGroupDefaults.removable),
        description:
          'Shows a remove button on every tag and enables Delete and Backspace; listen to remove to drop the tags.',
      },
      {
        name: 'disallowEmptySelection',
        type: 'boolean',
        default: formatValue(tagGroupDefaults.disallowEmptySelection),
        description: 'Prevents deselecting the last selected tag, also with Escape.',
      },
      {
        name: 'escapeKeyBehavior',
        type: toUnion(tagGroupEscapeKeyBehaviors),
        default: formatValue(tagGroupDefaults.escapeKeyBehavior),
        description: 'Whether Escape clears the selection.',
      },
      {
        name: 'variant',
        type: toUnion(tagGroupVariantNames),
        default: formatValue(tagGroupDefaults.variant),
        description: 'Bordered, softly filled, or solid look of the tags and selected tags.',
      },
      {
        name: 'size',
        type: toUnion(tagGroupSizes),
        default: formatValue(tagGroupDefaults.size),
        description:
          'Height, padding, text, icon, and remove button size, and the gap between tags.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: formatValue(tagGroupDefaults.radius),
        description: 'Tailwind radius token, CSS border-radius value, or a number of pixels.',
      },
      {
        name: 'color',
        type: 'string',
        default: formatValue(tagGroupDefaults.color),
        description: 'Theme token or CSS color for selected tags and the focus ring.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: formatValue(tagGroupDefaults.disabled),
        description: 'Disables every tag.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: formatValue(tagGroupDefaults.loop),
        description: 'Keyboard navigation wraps from the last tag to the first and back.',
      },
      {
        name: 'ui',
        type: `{
  item?: (context: TagGroupItemContext) => HTMLAttributes
  label?: (context: TagGroupItemContext) => HTMLAttributes
  delete?: (context: TagGroupItemContext) => HTMLAttributes
  empty?: () => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  item?: (context: ' },
          { text: 'TagGroupItemContext', link: '#tag-group-item-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'TagGroupItemContext', link: '#tag-group-item-context' },
          { text: ') => HTMLAttributes\n  delete?: (context: ' },
          { text: 'TagGroupItemContext', link: '#tag-group-item-context' },
          { text: ') => HTMLAttributes\n  empty?: () => HTMLAttributes\n}' },
        ],
        default: formatValue(tagGroupDefaults.ui),
        description:
          'Resolvers for attributes and classes on each part of a tag (the tag, the label, and the remove button) and on the empty text. The icons are replaced with the leading and deleteIcon slots.',
      },
    ],
    configs: [
      {
        id: 'tag-group-item',
        title: 'TagGroupItem',
        typeLabel: 'TagGroupItem',
        rows: [
          {
            name: 'value',
            type: 'string | number',
            required: true,
            description: 'Unique value of the tag, used for selection and removal.',
          },
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Text of the tag, also used as its accessible name and for typeahead.',
          },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon#props',
            default: 'undefined',
            description: 'Icon shown before the label.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables this tag only.',
          },
        ],
      },
      {
        id: 'tag-group-item-context',
        title: 'TagGroupItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the slots and the ui resolvers.',
        rows: [
          {
            name: 'item',
            type: 'TagGroupItem',
            typeLink: '#tag-group-item',
            description: 'Configuration for this tag.',
          },
          { name: 'index', type: 'number', description: 'Zero-based position in items.' },
          { name: 'selected', type: 'boolean', description: 'Whether this tag is selected.' },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Whether this tag is disabled, by itself or by the group.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string | number | Array<string | number> | undefined]',
        description: 'Emitted when the selection changes.',
      },
      {
        name: 'change',
        type: '[value: string | number | Array<string | number> | undefined]',
        description:
          'Emitted when the user changes the selection. It is not emitted when modelValue changes from outside.',
      },
      {
        name: 'remove',
        type: '[values: Array<string | number>]',
        description:
          'Emitted with the values to remove when the user removes tags, only while removable is true.',
      },
    ],
    slots: [
      {
        name: 'leading',
        type: 'TagGroupItemContext',
        typeLink: '#tag-group-item-context',
        description: 'Content before the label, replacing the icon of every tag.',
      },
      {
        name: 'label',
        type: 'TagGroupItemContext',
        typeLink: '#tag-group-item-context',
        description: 'Shared label, replacing the label of every tag.',
      },
      {
        name: 'deleteIcon',
        type: 'TagGroupItemContext',
        typeLink: '#tag-group-item-context',
        description: 'Icon of the remove button of every tag.',
      },
      {
        name: 'empty',
        type: '-',
        description:
          'Content shown while items is empty, replacing the empty text. It also renders when no empty prop is set.',
      },
    ],
    expose: [],
  },
}

export default tagGroupConfig
