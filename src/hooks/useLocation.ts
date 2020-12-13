import { useNavigator } from '../hooks'

export function useLocation() {
  let navigator = useNavigator()
  return navigator.serialize(navigator.location.search)
}
