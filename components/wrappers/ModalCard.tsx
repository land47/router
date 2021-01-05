import React, { FC } from 'react'
import { ModalCard as VKUIModalCard } from '@vkontakte/vkui'
import type { ModalCardProps as VKUIModalCardProps } from '@vkontakte/vkui/dist/components/ModalCard/ModalCard'
import { useRouter } from '../../hooks'

export type ModalCardProps = Omit<VKUIModalCardProps, 'onClose'>

/**
 * Обёртка над ``VKUI`` компонентом ``ModalCard``.
 * Инкапсулирует логику обработки кнопки назад.
 */
export let ModalCard: FC<ModalCardProps> = props => {
  let { back } = useRouter()

  return <VKUIModalCard onClose={back} {...props} />
}
