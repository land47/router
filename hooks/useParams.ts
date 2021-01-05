import { useNavigator } from './index'

/**
 * Возвращает состояние (параметры) текущей записи в истории.
 */
export let useParams = () => useNavigator().history.state || {}
