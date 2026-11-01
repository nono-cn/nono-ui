export const bubbleAlignments = ['start', 'end'] as const
export const bubbleVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
export const bubbleSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const bubbleReactionsSides = ['top', 'bottom'] as const
export const bubbleReactionsAlignments = ['start', 'end'] as const

export const bubbleDefaults = {
  as: 'div' as const,
  asChild: false,
  align: 'start' as const,
  variant: 'subtle' as const,
  size: 'md' as const,
  radius: 'xl' as const,
  color: 'neutral',
  reactionsSide: 'bottom' as const,
  reactionsAlign: 'end' as const,
  ui: undefined,
}
