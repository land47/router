/**
 * Запись в истории, представленная в виде объекта.
 * */
export type SerializedURLParams<K extends string[]> = Record<K[number], string>

/**
 * Обработчик изменения истории.
 * */
export type HistoryListenerHandler<K extends string[]> = (
  record: SerializedURLParams<K>
) => void

/**
 * Слушатель изменений в истории.
 * */
export type HistoryListener<K extends string[] = string[]> = {
  keys: string[]
  handler: HistoryListenerHandler<K>
}

/**
 * Структура приложения.
 * */
export type ApplicationStructure = {
  [K in 'story' | 'view' | 'panel']?: string
}

/**
 * Состояние записи (хранится и может быть доступно вместе с ней)
 * */
export type HistoryItemState<T> = Record<string, T>
