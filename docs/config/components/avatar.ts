import type { ComponentDocConfig } from '../component-docs'
import AvatarDelayMsExample from '../../components/examples/avatar/AvatarDelayMsExample.vue'
import AvatarFallbackExample from '../../components/examples/avatar/AvatarFallbackExample.vue'
import AvatarIconExample from '../../components/examples/avatar/AvatarIconExample.vue'
import AvatarLabelExample from '../../components/examples/avatar/AvatarLabelExample.vue'
import AvatarShapeExample from '../../components/examples/avatar/AvatarShapeExample.vue'
import AvatarSizeExample from '../../components/examples/avatar/AvatarSizeExample.vue'
import AvatarSrcExample from '../../components/examples/avatar/AvatarSrcExample.vue'
import AvatarUsageExample from '../../components/examples/avatar/AvatarUsageExample.vue'

const avatarConfig: ComponentDocConfig = {
  slug: 'avatar',
  title: 'Avatar',
  language: 'en',
  description: 'Displays a profile image with fallback content when the image is unavailable.',
  importPath: '@nono-ui/components/ui/Avatar',
  usage: [
    {
      title: 'Basic usage',
      description: 'Display a profile image with a text fallback.',
      component: AvatarUsageExample,
    },
  ],
  examples: [
    {
      title: 'Src',
      description: 'Load the profile image from a URL.',
      component: AvatarSrcExample,
    },
    {
      title: 'Size',
      description: 'Adjust the avatar’s visual size.',
      component: AvatarSizeExample,
    },
    {
      title: 'Shape',
      description: 'Choose between a circular or square shape.',
      component: AvatarShapeExample,
    },
    {
      title: 'DelayMs',
      description: 'Delay the appearance of the fallback content.',
      component: AvatarDelayMsExample,
    },
    {
      title: 'Icon',
      description: 'Show an icon in the avatar fallback.',
      component: AvatarIconExample,
    },
    {
      title: 'Label',
      description: 'Show text in the avatar fallback.',
      component: AvatarLabelExample,
    },
    {
      title: 'Fallback',
      description: 'Replace the avatar’s fallback content entirely.',
      component: AvatarFallbackExample,
    },
  ],
  accessibility: [
    {
      title: 'Alternative text',
      description:
        'Pass alt as an attribute when src points to an informative image. Use label to provide a text fallback when the image is unavailable, and avoid relying on color or initials alone to communicate identity.',
    },
    {
      title: 'Icons and custom content',
      description:
        'Mark decorative icons passed through icon with aria-hidden="true". If you use the fallback slot, preserve a clear accessible name (aria-label / aria-labelledby) or surrounding context when the avatar is relevant to the task.',
    },
  ],
  api: {
    props: [
      {
        name: 'src',
        type: 'string',
        default: 'undefined',
        description:
          'Profile image URL. The fallback is rendered if the image cannot be displayed.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Visual size of the avatar.',
      },
      {
        name: 'shape',
        type: "'rounded' | 'square'",
        default: "'rounded'",
        description: 'Visual shape of the avatar: circular or square.',
      },
      {
        name: 'delayMs',
        type: 'number',
        default: 'undefined',
        description: 'Delay in milliseconds before showing the fallback content.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description:
          'Icon configuration displayed in the fallback when the fallback slot is not provided.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description:
          'Text displayed in the fallback when neither icon nor the fallback slot is provided.',
      },
    ],
    configs: [
      {
        id: 'avatar-config',
        title: 'AvatarConfig',
        description: 'Alias for AvatarProps, used to configure avatars in composite components.',
        showDefault: false,
        rows: [
          {
            name: 'AvatarProps',
            type: 'AvatarProps',
            typeLink: '#props',
            description: 'Includes Avatar’s public props.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'fallback',
        type: '-',
        description: 'Replaces the avatar’s fallback content entirely.',
      },
    ],
    expose: [],
  },
}

export default avatarConfig
