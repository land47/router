import { useSafeContext } from '.'
import * as Contexts from '../contexts'

/**
 * Возвращает состояние (параметры) текущей записи в истории.
 */
export let useParams = () =>
  useSafeContext(Contexts.Navigator).history.state || {}
