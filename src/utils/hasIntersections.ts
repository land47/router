export function hasIntersections<T>(a: T[], b: T[]) {
  return !!a.find(e => b.includes(e))
}
