import type { ComponentDocConfig } from '../component-docs'
import { avatarDefaults, avatarSizes } from '@/components/ui/Avatar'
import AvatarSrcExample from '../../components/examples/avatar/AvatarSrcExample.vue'
import AvatarSizeExample from '../../components/examples/avatar/AvatarSizeExample.vue'
import AvatarRadiusExample from '../../components/examples/avatar/AvatarRadiusExample.vue'
import AvatarColorExample from '../../components/examples/avatar/AvatarColorExample.vue'
import AvatarDelayMsExample from '../../components/examples/avatar/AvatarDelayMsExample.vue'
import AvatarIconExample from '../../components/examples/avatar/AvatarIconExample.vue'
import AvatarLabelExample from '../../components/examples/avatar/AvatarLabelExample.vue'
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
      description: 'Set the URL and alternative text of the profile image.',
      component: AvatarSrcExample,
    },
    {
      title: 'Size',
      description: 'Choose the avatar size.',
      component: AvatarSizeExample,
    },
    {
      title: 'Radius',
      description: 'Choose the corner radius of the avatar.',
      component: AvatarRadiusExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or custom color for the avatar fallback.',
      component: AvatarColorExample,
    },
    {
      title: 'DelayMs',
      description: 'Choose how long to wait before showing the fallback.',
      component: AvatarDelayMsExample,
    },
    {
      title: 'Icon',
      description: 'Choose the icon displayed in the avatar fallback.',
      component: AvatarIconExample,
    },
    {
      title: 'Label',
      description: 'Set the text shown in the avatar fallback.',
      component: AvatarLabelExample,
    },
  ],
  accessibility: [
    {
      title: 'Alternative text',
      description:
        'Set alt when src points to an informative image. Use label to provide a text fallback when the image is unavailable, and avoid relying on color or initials alone to communicate identity.',
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
        default: String(avatarDefaults.src),
        description:
          'Profile image URL. The fallback is rendered if the image cannot be displayed.',
      },
      {
        name: 'alt',
        type: 'string',
        default: `'${avatarDefaults.alt}'`,
        description:
          'Alternative text for the profile image. An empty value marks it as decorative.',
      },
      {
        name: 'size',
        type: avatarSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${avatarDefaults.size}'`,
        description: 'Visual size of the avatar.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${avatarDefaults.radius}'`,
        description: 'Tailwind radius token, CSS border-radius value, or a number of pixels.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${avatarDefaults.color}'`,
        description: 'Theme token or CSS color used for the fallback text and soft background.',
      },
      {
        name: 'delayMs',
        type: 'number',
        default: String(avatarDefaults.delayMs),
        description: 'Delay in milliseconds before showing the fallback content.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(avatarDefaults.icon),
        description:
          'Name of the icon displayed in the fallback when the fallback slot is not provided.',
      },
      {
        name: 'label',
        type: 'string',
        default: String(avatarDefaults.label),
        description:
          'Text displayed in the fallback when neither icon nor the fallback slot is provided.',
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
    expose: [],
  },
}

export default avatarConfig
