export function shouldIgnorePromptKeyDownDuringComposition(
  isComposing: boolean,
  nativeIsComposing: boolean,
  keyCode: number,
) {
  return isComposing || nativeIsComposing || keyCode === 229
}
