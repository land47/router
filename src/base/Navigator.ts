import { HistoryListener, HistoryListenerHandler } from 'shared/types'
import { isEqualsArrays } from '../utils'

export class Navigator {
  private readonly listeners: HistoryListener[] = []

  constructor() {
    window.addEventListener('popstate', this.lifecycle)
  }

  /**
   * Жизненный цикл, через который проходит каждая запись в истории.
   *
   * 1 – Сериализация URL-параметров в объект.
   * 2 – Поиск всех слушателей, которым нужна текущая запись.
   * 3 – Отправка записи в виде объекта слушателям.
   * */
  private readonly lifecycle = () => {
    // step 1
    let serialized = this.serialize(this.location.search)

    //
  }

  /**
   * Создаёт слушатель изменений в истории браузера.
   * */
  readonly createListener = <K extends string[]>(
    keys: K,
    handler: HistoryListenerHandler<K>
  ) => {
    this.listeners.push({
      keys,
      handler,
    })
  }

  /**
   * Удаляет слушателя изменений, если такой найден.
   * */
  readonly removeListener = <K extends string[]>(
    keys: K,
    handler: HistoryListenerHandler<K>
  ) => {
    // prettier-ignore
    let index = this.listeners.findIndex(listener =>
      listener.handler === handler && isEqualsArrays(listener.keys, keys)
    )

    index && this.listeners.splice(index, 1)
  }

  get location() {
    return window.location
  }

  get history() {
    return window.history
  }

  /**
   * Сериализует URL-параметры в объект.
   * */
  private serialize(search: string) {
    return Object.fromEntries(new URLSearchParams(search))
  }
}
