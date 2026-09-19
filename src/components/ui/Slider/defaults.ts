export const sliderDefaults = {
  value: () => [0] as number[],
  disabled: false,
  orientation: 'horizontal' as const,
  inverted: false,
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  thumbAlignment: 'contain' as const,
  size: 'md' as const,
  severity: 'primary' as const,
}
