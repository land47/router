import { HistoryListener, HistoryListenerHandler } from '../shared/types'
import { isEqualArrays, hasIntersections } from '../utils'

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

    // step 2
    let subscribers = this.findListenersByKeys(Object.keys(serialized))

    // step 3
    subscribers.forEach(listener => listener.handler(serialized))
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
   * Удаляет слушатель изменений, если такой найден.
   * */
  readonly removeListener = <K extends string[]>(
    keys: K,
    handler: HistoryListenerHandler<K>
  ) => {
    // prettier-ignore
    let index = this.listeners.findIndex(listener =>
      listener.handler === handler && isEqualArrays(listener.keys, keys)
    )

    index && this.listeners.splice(index, 1)
  }

  /**
   * Получение текущей локации. (Location API)
   * */
  get location() {
    return window.location
  }

  /**
   * Получение текущей истории. (History API)
   * */
  get history() {
    return window.history
  }

  /**
   * Сериализует URL-параметры в объект.
   * */
  private serialize(search: string) {
    return Object.fromEntries(new URLSearchParams(search))
  }

  /**
   * Десериализует объект в строку URL-параметров.
   * */
  private deserialize(object: Record<string, string>) {
    return '?' + new URLSearchParams(object)
  }

  /**
   * Ищет слушателей по массиву с ключами.
   * */
  private readonly findListenersByKeys = (keys: string[]) => {
    return this.listeners.filter(listener =>
      hasIntersections(keys, listener.keys)
    )
  }

  /**
   * Добавляет новую запись в историю, вызывая событие `popstate`.
   * */
  readonly push = (record: Record<string, string>) => {
    this.history.pushState('', '', this.deserialize(record))
    this.dispatch(null)
  }

  /**
   * Заменяет текущую запись в истории, вызывая событие `popstate`.
   * */
  readonly replace = (record: Record<string, string>) => {
    this.history.replaceState('', '', this.deserialize(record))
    this.dispatch(null)
  }

  /**
   * Возвращает на прошлую запись в истории, или если такой нет,
   * закрывает приложение.
   * */
  readonly back = () => {
    this.history.back()
  }

  /**
   * Вызывает событие `popstate`, передавая в качестве состояния
   * объект или null.
   * */
  private dispatch(state: Record<string, string> | null) {
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }
}
