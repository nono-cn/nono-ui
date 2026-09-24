export const tooltipDefaults = {
  delayDuration: 0,
  disableClosingTrigger: false,
  disabled: false,
  ignoreNonKeyboardFocus: false,
  showArrow: false,
}

export const tooltipContentDefaults = {
  align: 'center' as const,
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionPadding: 0,
  forceMount: false,
  hideWhenDetached: false,
  positionStrategy: 'fixed' as const,
  side: 'top' as const,
  sideOffset: 2,
  sticky: 'partial' as const,
  updatePositionStrategy: 'optimized' as const,
}

export const tooltipArrowDefaults = {
  width: 10,
  height: 5,
}
