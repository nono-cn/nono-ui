<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Bubble, bubbleDefaults } from '@/components/ui/Bubble'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  messageAvatarVariants,
  messageBubbleVariants,
  messageContentVariants,
  messageFooterVariants,
  messageHeaderVariants,
  messageVariants,
  type MessageProps,
  type MessageSlots,
} from '.'
import { messageDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MessageProps>(), messageDefaults)
const slots = defineSlots<MessageSlots>()

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  class: cn(messageVariants({ align: props.align }), attrs.class),
}))

const avatarProps = computed(() => ({
  class: messageAvatarVariants(),
}))

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)
  return {
    ...ui,
    class: cn(messageContentVariants({ align: props.align }), ui.class),
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return {
    ...ui,
    class: cn(messageHeaderVariants(), ui.class),
  }
})

const bubbleProps = computed(() => {
  const reactionsSide = props.bubble?.reactionsSide ?? bubbleDefaults.reactionsSide

  return {
    ...props.bubble,
    align: props.align,
    class: messageBubbleVariants({ reactionsSide: slots.reactions ? reactionsSide : undefined }),
  }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, undefined)
  return {
    ...ui,
    class: cn(messageFooterVariants(), ui.class),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-message-root>
    <div v-if="slots.avatar || props.avatar" v-bind="avatarProps" data-test-message-avatar>
      <slot name="avatar">
        <Avatar v-bind="props.avatar" />
      </slot>
    </div>

    <div v-bind="contentProps" data-test-message-content>
      <div v-if="slots.header" v-bind="headerProps" data-test-message-header>
        <slot name="header" />
      </div>

      <Bubble v-bind="bubbleProps">
        <slot>{{ props.message }}</slot>
        <template v-if="slots.reactions" #reactions>
          <slot name="reactions" />
        </template>
      </Bubble>

      <div v-if="slots.footer" v-bind="footerProps" data-test-message-footer>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
