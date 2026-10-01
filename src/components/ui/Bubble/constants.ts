export const bubbleAlignments = ['start', 'end'] as const
export const bubbleVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
export const bubbleReactionsSides = ['top', 'bottom'] as const
export const bubbleReactionsAlignments = ['start', 'end'] as const
export const bubbleDefaults = {
  as: 'div' as const,
  asChild: false,
  align: 'start' as const,
  variant: 'subtle' as const,
  radius: 'xl' as const,
  color: 'neutral',
  sideReaction: 'bottom' as const,
  alignReaction: 'end' as const,
  ui: undefined,
}

export const bubbleReactionsDefaults = {
  side: bubbleDefaults.sideReaction,
  align: bubbleDefaults.alignReaction,
}
