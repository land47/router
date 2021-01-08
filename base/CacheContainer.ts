export class CacheContainer<Key, Value> {
  /**
   * Контейнер, в котором хранится кэшированные данные.
   */
  private readonly container: Map<Key, Value>

  /**
   * Максимальное количество элементов, одновременно хранящихся в контейнере.
   */
  static MAX_SIZE: number = 8

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
  set = (key: Key, value: Value) => {
    if (this.container.size === CacheContainer.MAX_SIZE) {
      this.container.delete(this.container.keys().next().value)
    }

    this.container.set(key, value)
  }

  /**
   * Возвращает значение (или undefined) из контейнера по ключу.
   */
  get = (key: Key) => this.container.get(key)
}
