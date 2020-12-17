export function areArraysEqual<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return false
  }

  if (a === b) {
    return true
  }

  return a.every(e => b.find(el => el === e))
}
