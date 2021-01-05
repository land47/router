import React, { FC } from 'react'
import { ModalRoot as VKUIModalRoot } from '@vkontakte/vkui'
import type { ModalRootProps as VKUIModalRootProps } from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot'
import { useRouter } from '../../hooks'

export type ModalRootProps = Omit<VKUIModalRootProps, 'onClose'>

/**
 * Обёртка над ``VKUI`` компонентом ``ModalRoot``.
 * Инкапсулирует логику обработки кнопки назад.
 */
export let ModalRoot: FC<ModalRootProps> = props => {
  let { back } = useRouter()

  return <VKUIModalRoot onClose={back} {...props} />
}
