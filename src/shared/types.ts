import { ReactNode } from 'react'

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
} &
  PopoutsStructure

export type PopoutsStructure = {
  modal?: null | string
}

export type Snackbar = ReactNode

/**
 * Интерфейс работы со снэкбаром.
 * */
export type SnackbarControls = {
  setSnackbar(snackbar: Snackbar): void
  closeSnackbar(): void
}

/**
 * Состояние записи (хранится и может быть доступно вместе с ней)
 * */
export type HistoryItemState<T> = Record<string, T>
