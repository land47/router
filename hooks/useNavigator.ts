import { useSafeContext } from '.'
import * as Contexts from '../contexts'

export let useNavigator = () => useSafeContext(Contexts.Navigator)
