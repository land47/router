import {
  HistoryListener,
  HistoryListenerHandler,
  HistoryItemState,
} from '../shared/types'
import { isEqualArrays, hasIntersections } from '../utils'

export class Navigator {
  private readonly listeners: HistoryListener[] = []
  /**
   * Список задач, которые будут выполненны при каждом
   * вызове жизненного цикла.
   * */
  private readonly tasks: VoidFunction[] = []
  private frozen = false

  constructor() {
    window.addEventListener('popstate', this.lifecycle)
  }

  /**
   * Жизненный цикл, через который проходит каждая запись в истории.
   *
   * 1 – Если навигатор заморожен, пропускаем следующие шаги.
   * 2 – Вызываем все задачи.
   * 3 – Сериализация URL-параметров в объект.
   * 4 – Поиск всех слушателей, которым нужна текущая запись.
   * 5 – Поиск слушателей, которые подписанны на любое изменение истории.
   * 6 – Отправка записи в виде объекта слушателям.
   * */
  private readonly lifecycle = () => {
    // 1
    if (this.frozen) {
      return
    }

    // 2
    this.tasks.forEach(task => task())

    // 3
    let serialized = this.serialize(this.location.search)

    // 4 & 5
    let subscribers = this.findListenersByKeys([
      ...Object.keys(serialized),
      '*',
    ])

    // 6
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
   * Создаёт задачу, которая будет выполнена вначале
   * каждого жизненного цикла.
   * */
  readonly createTask = (task: VoidFunction) => {
    this.tasks.push(task)
  }

  /**
   * Удаляет задачу.
   * */
  readonly removeTask = (task: VoidFunction) => {
    let index = this.tasks.findIndex(e => e === task)
    index && this.tasks.splice(index, 1)
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
   * Выполняет переход на определенную страницу в истории текущей сессии.
   * С его помощью можно перемещаться как вперед, так и назад,
   * в зависимости от значения параметра.
   * */
  readonly go = (delta: number) => {
    this.history.go(delta)
  }

  /**
   * Вызывает событие `popstate`, передавая в качестве состояния
   * объект или null.
   * */
  private dispatch<T>(state: HistoryItemState<T>) {
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }

  /**
   * Замораживает навигатор. Пока он заморожен, жизненный цикл
   * будет пропускать свою работу.
   * */
  readonly freeze = () => {
    this.frozen = true
  }

  /**
   * Размораживает навигатор.
   * */
  readonly unfreeze = () => {
    this.frozen = false
  }
}
