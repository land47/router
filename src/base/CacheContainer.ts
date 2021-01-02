export class CacheContainer<Key, Value> {
  private readonly container: Map<Key, Value>

  constructor(...initialValue: [Key, Value][]) {
    this.container = new Map(initialValue)
  }

  /**
   * Метод позволяет проверить есть ли в кэше
   * элемент с переданным ключом.
   */
  has = (key: Key) => this.container.has(key)

  /**
   * Добавляет (или заменяет) значение по ключу в контейнер.
   */
  set = (key: Key, value: Value) => this.container.set(key, value)

  /**
   * Возвращает значение (или undefined) из контейнера по ключу.
   */
  get = (key: Key) => this.container.get(key)
}
