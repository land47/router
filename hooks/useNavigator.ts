import { useSafeContext } from '.'
import { NavigatorContext } from '../contexts'

/**
 * Возвращает объект (инстанс) навигатора.
 */
export let useNavigator = () => useSafeContext(NavigatorContext)
