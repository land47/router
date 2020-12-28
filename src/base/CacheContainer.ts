export class CacheContainer<Key, Value> {
  private readonly container: Map<Key, Value>

  constructor(...initialValue: [Key, Value][]) {
    this.container = new Map(initialValue)
  }

  /**
   * Если в контейнере есть ключ, возвращает значение по этому ключу.
   * В обратном случае устанавливает значение по ключу, возвращая значение.
   */
  load = (key: Key, value: Value) => {
    if (this.container.has(key)) {
      return this.container.get(key)
    }

    this.container.set(key, value)
    return value
  }
}
