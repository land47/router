import { useHistory, useSafeContext } from '.'
import * as Contexts from '../contexts'

export function useLocation() {
  let navigator = useSafeContext(Contexts.Navigator)
  let history = useHistory()

  return (
    history.slice(-1)[0] ||
    navigator.convertSearchParams(navigator.location.search)
  )
}
