import { useNavigator } from '../hooks'

/**
 * Возвращает состояние (параметры) текущей записи в истории.
 */
export let useParams = () => useNavigator().history.state || {}
