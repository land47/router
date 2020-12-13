import {
  HistoryListener,
  HistoryListenerHandler,
  HistoryItemState,
} from '../shared/types'
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
   * 3 – Поиск слушателей, которые подписанны на любое изменение истории.
   * 4 – Отправка записи в виде объекта слушателям.
   * */
  private readonly lifecycle = () => {
    // step 1
    let serialized = this.serialize(this.location.search)

    // step 2 & step 3
    let subscribers = this.findListenersByKeys([
      ...Object.keys(serialized),
      '*',
    ])

    // step 4
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
  serialize(search: string) {
    return Object.fromEntries(new URLSearchParams(search))
  }

  /**
   * Десериализует объект в строку URL-параметров.
   * */
  deserialize(object: Record<string, string>) {
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
  readonly push = <T>(
    record: Record<string, string>,
    state: HistoryItemState<T> = {}
  ) => {
    this.history.pushState(state, '', this.deserialize(record))
    this.dispatch(state)
  }

  /**
   * Заменяет текущую запись в истории, вызывая событие `popstate`.
   * */
  readonly replace = <T>(
    record: Record<string, string>,
    state: HistoryItemState<T> = {}
  ) => {
    this.history.replaceState(state, '', this.deserialize(record))
    this.dispatch(state)
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
  private dispatch<T>(state: HistoryItemState<T>) {
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }
}
