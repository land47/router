import { useNavigator } from '../hooks'

export function useParams() {
  let navigator = useNavigator()
  return navigator.history.state
}
