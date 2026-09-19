export const checkboxDefaults = {
  trueValue: true,
  falseValue: false,
  size: 'md' as const,
  severity: 'primary' as const,
  color: undefined,
  icon: () => ({ name: 'check' as const }),
  indeterminateIcon: () => ({ name: 'minus' as const }),
  ui: undefined,
}
