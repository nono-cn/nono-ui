import type { SwitchContext, SwitchValue } from './index'
import { switchDefaults } from './constants'

export function createSwitchContext(
  modelValue: SwitchValue | undefined,
  trueValue: SwitchValue = switchDefaults.trueValue,
): SwitchContext {
  return { state: modelValue === trueValue }
}
