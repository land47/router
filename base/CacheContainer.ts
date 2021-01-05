export class CacheContainer<Key, Value> {
  /**
   * Контейнер, в котором хранится кэшированные данные.
   * Во избежание утечки памяти хранит только последние 8 элементов.
   */
  private container: Map<Key, Value>
  private MAX_SIZE: number = 8

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
    if (this.container.size === this.MAX_SIZE) {
      let container = [...this.container]
      container.shift()
      this.container = new Map(container)
    }

    this.container.set(key, value)
  }

  /**
   * Возвращает значение (или undefined) из контейнера по ключу.
   */
  get = (key: Key) => this.container.get(key)
}
