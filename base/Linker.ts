import * as Base from '../base'

/**
 * Линкер привязывает любое значение к уникальному id и ключу, добавляя
 * их в историю.
 *
 * ```typescript
 * linker.push(<Alert />, 'alert')
 * linker.getCurrent('alert') // <Alert />
 * linker.back()
 * linker.getCurrent('alert') // null
 *
 * // multiply
 * linker.push(<Alert />, 'alert')
 * linker.push(<Modal />, 'modal')
 *
 * linker.getCurrent('alert') // null
 * linker.getCurrent('modal') // <Modal />
 *
 * linker.back()
 * linker.getCurrent('alert') // <Alert />
 * linker.getCurrent('modal') // null
 * ```
 *
 * Это моя суперская и гениальная разработка (да-да, такой вот я крутой)
 */
export class Linker extends Base.Cache<string, unknown> {
  constructor(private readonly navigator: Base.Navigator) {
    super()
  }

  /**
   * Позволяет добавить в историю любое значение, привязав его к
   * уникальному id и ключу.
   */
  push = (el: unknown, _key: string) => {
    let _uid = this.makeId()
    this.set(_uid, el)

    this.navigator.push({
      ...this.navigator.convertSearchParams(this.navigator.location.search),
      _key,
      _uid,
    })
  }

  getCurrent = (key: string) => {
    let { _uid, _key } = this.navigator.convertSearchParams(
      this.navigator.location.search
    )

    return (_uid && _key === key && this.get(_uid)) || null
  }

  back = () => {
    this.navigator.back()
  }

  private makeId = () => '' + Math.random()
}
