import {
  HistoryListener,
  HistoryListenerHandler,
  HistoryItemState,
  SerializedURLParams,
} from '../shared/types'
import { isEqualArrays, hasIntersections, isEqualObjects } from '../utils'

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
    let serialized = this.convertSearchParams(this.location.search)

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
   * Преобразует строку URL-параметров в объект.
   *
   * ```
   * ?panel=info => { panel: 'info' }
   * ```
   * */
  convertSearchParams(search: string): SerializedURLParams
  /**
   * Преобразует объект в строку URL-параметров.
   *
   * ```
   * { panel: 'info' } => ?panel=info
   * ```
   * */
  convertSearchParams(search: SerializedURLParams): string
  convertSearchParams(
    search: string | SerializedURLParams
  ): string | SerializedURLParams {
    if (typeof search === 'string') {
      return Object.fromEntries(new URLSearchParams(search))
    }

    return '?' + new URLSearchParams(search)
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
   * Если текущая запись в истории равна новой – пропускает добавление.
   * */
  readonly push = <T>(
    record: Record<string, string>,
    state: HistoryItemState<T> = {}
  ) => {
    if (
      this.convertSearchParams(record) === this.location.search &&
      isEqualObjects(record, this.history.state)
    ) {
      return
    }

    this.history.pushState(state, '', this.convertSearchParams(record))
    this.dispatchEvent(state)
  }

  /**
   * Заменяет текущую запись в истории, вызывая событие `popstate`.
   * */
  readonly replace = <T>(
    record: Record<string, string>,
    state: HistoryItemState<T> = {}
  ) => {
    this.history.replaceState(state, '', this.convertSearchParams(record))
    this.dispatchEvent(state)
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
  private dispatchEvent<T>(state: HistoryItemState<T>) {
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }

  /**
   * Замораживает работу жизненого цикла.
   * */
  readonly freezeLifecycle = () => {
    this.frozen = true
  }

  /**
   * Возобновляет работу жизненного цикла.
   * */
  readonly unfreezeLifecycle = () => {
    this.frozen = false
  }
}
