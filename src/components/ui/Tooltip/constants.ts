export const tooltipDefaults = {
  delayDuration: 0,
  disableHoverableContent: undefined,
  disableClosingTrigger: false,
  disabled: false,
  ignoreNonKeyboardFocus: false,
  text: undefined,
  content: undefined,
  arrow: undefined,
  showArrow: false,
}

export const tooltipContentDefaults = {
  as: 'div' as const,
  asChild: false,
  side: 'top' as const,
  sideOffset: 4,
  align: 'center' as const,
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: [],
  collisionPadding: 8,
  arrowPadding: 0,
  sticky: 'partial' as const,
  hideWhenDetached: false,
  positionStrategy: 'fixed' as const,
  updatePositionStrategy: 'optimized' as const,
  ariaLabel: undefined,
  forceMount: false,
}

export const tooltipArrowDefaults = {
  as: 'svg' as const,
  asChild: false,
  width: 10,
  height: 5,
}
