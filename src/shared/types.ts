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
