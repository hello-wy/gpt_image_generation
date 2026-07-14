import { describe, expect, it } from 'vitest'
import { shouldIgnorePromptKeyDownDuringComposition } from './compositionEvent'

describe('composition event helpers', () => {
  it('ignores keydown while the input method is composing', () => {
    expect(shouldIgnorePromptKeyDownDuringComposition(true, false, 13)).toBe(true)
  })

  it('ignores browser keydown events marked as composing', () => {
    expect(shouldIgnorePromptKeyDownDuringComposition(false, true, 13)).toBe(true)
  })

  it('ignores process key events emitted by IME composition', () => {
    expect(shouldIgnorePromptKeyDownDuringComposition(false, false, 229)).toBe(true)
  })

  it('keeps normal enter keydown handling enabled', () => {
    expect(shouldIgnorePromptKeyDownDuringComposition(false, false, 13)).toBe(false)
  })
})
