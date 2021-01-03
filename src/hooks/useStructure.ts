import { ReactNode, useEffect, useMemo } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useNavigator, usePopout, useRouter, useSearch } from '../hooks'
import { areObjectsEqual } from '../utils'

type Structure<S extends ApplicationStructure> = S & {
  modal: ReactNode
  popout: ReactNode
}

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 */
export function useStructure<S extends ApplicationStructure, T>(
  initial: S,
  options: HistoryItemState<T> = {}
): Structure<S> {
  let search = useSearch(Object.keys(initial)) as S
  let navigator = useNavigator()
  let router = useRouter()

  useEffect(() => {
    let hash = window.location.hash.slice(1)

    // Фикс повторного первого рендера приложения
    navigator.freezeLifecycle()
    router
      .replace(initial, options)
      .then(navigator.unfreezeLifecycle)
      .then(() => {
        // Если нет хеша, или начальная структура равна структуре,
        // переданной хешем, пропускаем добавление записи.
        if (
          !hash ||
          areObjectsEqual(navigator.convertSearchParams(hash), initial)
        ) {
          return
        }

        let serialized = navigator.convertSearchParams(hash)

        // Не включаем данные о структуре в параметры.
        // #panel=home&a=1&b=2 => { a: '1', b: '2' }
        let params = (({ modal, story, view, panel, ...o }) => o)(serialized)
        router.push(serialized, params)
      })
  }, [])

  return { modal: null, popout: usePopout().popout, ...(search || initial) }
}
