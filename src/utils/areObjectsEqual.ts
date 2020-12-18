export function areObjectsEqual<V, T extends Record<string, V>>(a: T, b: T) {
  if (a === b) {
    return true
  }

  let entries1 = Object.entries(a)
  let entries2 = Object.entries(b)

  if (entries1.length !== entries2.length) {
    return false
  }

  return entries1.every(([key]) => a[key] === b[key])
}
