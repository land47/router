export class CacheContainer<Key, Value> {
  private readonly container: Map<Key, Value>

  constructor(...initialValue: [Key, Value][]) {
    this.container = new Map(initialValue)
  }

  load = (key: Key, value: Value) => {
    if (this.container.has(key)) {
      return this.container.get(key)
    }

    this.container.set(key, value)
    return value
  }
}
