import { useHistory } from '.'

export function useLocation() {
  let history = useHistory()
  return history.slice(-1)[0] || {}
}
