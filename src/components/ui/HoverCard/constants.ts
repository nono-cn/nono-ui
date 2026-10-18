export const hoverCardDefaults = {
  openDelay: 700,
  closeDelay: 300,
  enableTouch: undefined,
  content: undefined,
  arrow: undefined,
  showArrow: false,
}

export const hoverCardContentDefaults = {
  as: 'div' as const,
  asChild: false,
  side: 'bottom' as const,
  sideOffset: 4,
  sideFlip: true,
  align: 'center' as const,
  alignOffset: 0,
  alignFlip: true,
  avoidCollisions: true,
  collisionBoundary: [],
  collisionPadding: 8,
  arrowPadding: 0,
  hideShiftedArrow: true,
  sticky: 'partial' as const,
  hideWhenDetached: false,
  positionStrategy: 'fixed' as const,
  updatePositionStrategy: 'optimized' as const,
  disableUpdateOnLayoutShift: false,
  prioritizePosition: false,
  forceMount: false,
}

export const hoverCardArrowDefaults = {
  as: 'svg' as const,
  asChild: false,
  width: 10,
  height: 5,
  rounded: false,
}
