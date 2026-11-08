import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AvatarFallback, AvatarImage } from 'reka-ui'
import { attrsTests, avatarImage, Part, render, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import { Avatar, avatarDefaults, avatarSizes, type AvatarProps } from '..'

const ROOT = '[data-test-avatar-root]'
const IMAGE = '[data-test-avatar-image]'
const FALLBACK = '[data-test-avatar-fallback]'
const LABEL = '[data-test-avatar-label]'
const SCREEN_READER_LABEL = '[data-test-avatar-screen-reader-label]'

const brokenImage = 'data:image/png;base64,broken'

const sizes = [...avatarSizes, null, 'unknown-size'] as AvatarProps['size'][]
const colors = [...themeColors, '#6366f1', '#facc15', '#1e3a8a', 'unknown-token']
const radii = [...themeRadii, 0, 8, '0.25rem']
const contents = [
  ['image', { src: avatarImage, alt: 'Avatar' }],
  ['label', { label: 'JD' }],
  ['long label', { label: 'Jane Doe' }],
  ['icon', { icon: 'user' }],
] as const

function rekaImageProps(props: AvatarProps = {}) {
  return mount(Avatar, { props }).findComponent(AvatarImage).props()
}

function rekaFallbackProps(props: AvatarProps = {}) {
  return mount(Avatar, { props }).findComponent(AvatarFallback).props()
}

async function renderAvatar(props: AvatarProps = {}) {
  const screen = await render(Avatar, { props })
  const image = screen.container.querySelector<HTMLElement>(IMAGE)!

  return { screen, image }
}

async function renderLabel(props: AvatarProps) {
  const screen = await render(Avatar, { props })
  await document.fonts.ready
  const root = screen.container.querySelector<HTMLElement>(ROOT)!
  const label = screen.container.querySelector<HTMLElement>(LABEL)!
  const screenReader = screen.container.querySelector<HTMLElement>(SCREEN_READER_LABEL)!

  return { screen, root, label, screenReader }
}

describe('Avatar', () => {
  beforeAll(async () => {
    const image = new Image()
    image.src = avatarImage
    await image.decode()
  })

  describe('props', () => {
    describe('src', () => {
      it('passes src to reka', () => {
        expect(rekaImageProps({ src: avatarImage }).src).toBe(avatarImage)
      })

      it(`by default passes an empty src to reka (avatarDefaults.src is ${avatarDefaults.src})`, () => {
        expect(rekaImageProps().src).toBe('')
      })
    })

    describe('alt', () => {
      const casesAlt = [
        {
          text: 'by default the image has the alt of avatarDefaults.alt',
          input: { src: avatarImage },
          expected: { image: { alt: avatarDefaults.alt } },
        },
        {
          text: 'a custom alt reaches the image',
          input: { src: avatarImage, alt: 'Jane Doe' },
          expected: { image: { alt: 'Jane Doe' } },
        },
      ] as const

      it.each(casesAlt)('$text', async ({ input, expected }) => {
        const { image } = await renderAvatar(input)

        expect({ image: { alt: image.getAttribute('alt') } }).toEqual(expected)
      })
    })

    describe('label', () => {
      const casesLabel = [
        {
          text: 'a label that fits is shown whole and read whole',
          input: { label: 'JD' },
          expected: { label: { text: 'JD', ariaHidden: 'true' }, screenReader: { text: 'JD' } },
        },
        {
          text: 'a label that does not fit is cut with three dots and read whole',
          input: { label: 'Jane Doe' },
          expected: {
            label: { text: 'Jan...', ariaHidden: 'true' },
            screenReader: { text: 'Jane Doe' },
          },
        },
      ] as const

      it.each(casesLabel)('$text', async ({ input, expected }) => {
        const { label, screenReader } = await renderLabel(input)

        expect({
          label: { text: label.textContent!.trim(), ariaHidden: label.getAttribute('aria-hidden') },
          screenReader: { text: screenReader.textContent!.trim() },
        }).toEqual(expected)
      })

      it('a cut label fits inside the avatar', async () => {
        const { root, label } = await renderLabel({ label: 'Jane Doe Smith', size: 'xs' })

        expect(label.getBoundingClientRect().width).toBeLessThanOrEqual(
          root.getBoundingClientRect().width,
        )
      })

      it('is fitted again when the label changes', async () => {
        const { screen, label } = await renderLabel({ label: 'JD' })

        await screen.rerender({ label: 'Jane Doe' })

        await expect.poll(() => label.textContent!.trim()).toBe('Jan...')
      })

      it('is fitted again when the size changes', async () => {
        const { screen, label } = await renderLabel({ label: 'Jane Doe', size: 'xs' })

        await screen.rerender({ size: 'xl' })

        await expect.poll(() => label.textContent!.trim()).toBe('Jane...')
      })
    })

    describe('delayMs', () => {
      it('passes delayMs to reka', () => {
        expect(rekaFallbackProps({ delayMs: 300 }).delayMs).toBe(300)
      })
    })

    describe('ui', () => {
      describe('image', () => {
        attrsTests({
          component: Avatar,
          props: { src: avatarImage },
          root: IMAGE,
          toProps: (attrs) => ({ ui: { image: () => attrs } }),
          class: { value: 'size-4', expected: { width: '16px' } },
        })
      })

      describe('fallback', () => {
        attrsTests({
          component: Avatar,
          props: { label: 'JD' },
          root: FALLBACK,
          toProps: (attrs) => ({ ui: { fallback: () => attrs } }),
          class: { value: 'size-4', expected: { width: '16px' } },
        })
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Avatar,
        props: { label: 'JD' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor', 'borderRadius', 'color'],
      })
    })
  })

  showcase({
    stories: {
      'Size x content': () => (
        <div class="grid gap-3">
          {contents.map(([content, props]) => (
            <Part name={content} title>
              <div class="flex flex-wrap items-end gap-4">
                {sizes.map((size) => (
                  <Part name={`${content} / ${size}`} caption={String(size)}>
                    <Avatar size={size} {...props} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Color: () => (
        <div class="grid gap-3">
          {(['label', 'icon'] as const).map((content) => (
            <Part name={content} title>
              <div class="flex flex-wrap items-end gap-4">
                {colors.map((color) => (
                  <Part name={`${content} / ${color}`} caption={String(color)}>
                    {content === 'label' ? (
                      <Avatar label="JD" color={color} />
                    ) : (
                      <Avatar icon="user" color={color} />
                    )}
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Radius: () => (
        <div class="grid gap-3">
          {(['image', 'label'] as const).map((content) => (
            <Part name={content} title>
              <div class="flex flex-wrap items-end gap-4">
                {radii.map((radius) => (
                  <Part name={`${content} / ${radius}`} caption={String(radius)}>
                    {content === 'image' ? (
                      <Avatar src={avatarImage} alt="Avatar" radius={radius} size="lg" />
                    ) : (
                      <Avatar label="JD" radius={radius} size="lg" />
                    )}
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Fallback: () => (
        <div class="grid grid-cols-4 items-start gap-x-6 gap-y-4">
          <Part name="src wins over label" caption>
            <Avatar src={avatarImage} alt="Avatar" label="JD" />
          </Part>
          <Part name="broken src shows label" caption>
            <Avatar src={brokenImage} label="JD" />
          </Part>
          <Part name="broken src shows icon" caption>
            <Avatar src={brokenImage} icon="user" />
          </Part>
          <Part name="icon wins over label" caption>
            <Avatar icon="user" label="JD" />
          </Part>
          <Part name="short label" caption>
            <Avatar label="J" />
          </Part>
          <Part name="long label" caption>
            <Avatar label="Jane Doe" />
          </Part>
          <Part name="no content" caption>
            <Avatar />
          </Part>
        </div>
      ),

      Slots: () => (
        <div class="grid grid-cols-4 items-start gap-x-6 gap-y-4">
          <Part name="fallback replaces label" caption>
            <Avatar label="JD">{{ fallback: () => <strong>99</strong> }}</Avatar>
          </Part>
          <Part name="fallback replaces icon" caption>
            <Avatar icon="user">
              {{ fallback: () => <span class="size-2 rounded-full bg-current" /> }}
            </Avatar>
          </Part>
          <Part name="src wins over fallback" caption>
            <Avatar src={avatarImage} alt="Avatar">
              {{ fallback: () => <strong>99</strong> }}
            </Avatar>
          </Part>
        </div>
      ),
    },
  })
})
