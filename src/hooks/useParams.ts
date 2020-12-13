import { useNavigator } from '../hooks'

/**
 * Возвращает состояние (параметры) текущей записи в истории.
 * */
export function useParams() {
  let navigator = useNavigator()
  return navigator.history.state
}
