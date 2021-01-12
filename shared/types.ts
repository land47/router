import { ReactNode } from 'react'

/**
 * Запись в истории, представленная в виде объекта.
 */
export type SerializedURLParams<K extends string[] = string[]> = Record<
  K[number],
  string
>

/**
 * Обработчик изменения истории.
 */
export type HistoryListenerHandler<K extends string[]> = (
  record: SerializedURLParams<K>
) => void

/**
 * Слушатель изменений в истории.
 */
export type HistoryListener<K extends string[] = string[]> = {
  keys: string[]
  handler: HistoryListenerHandler<K>
}

/**
 * Структура приложения.
 */
export type ApplicationStructure = {
  /**
   * Активная панель (https://vkcom.github.io/VKUI/#view)
   */
  panel?: string

  /**
   * Активный вью (https://vkcom.github.io/VKUI/#root)
   */
  view?: string

  /**
   * Активный story (https://vkcom.github.io/VKUI/#epic)
   */
  story?: string

  /**
   * Активное модальное окно. Если его нужно закрыть – передавать null.
   * (https://vkcom.github.io/VKUI/#section-modals)
   */
  modal?: string | null
}

/**
 * Состояние записи (хранится и может быть доступно вместе с ней)
 */
export type HistoryItemState<T = any> = Record<string, T>
