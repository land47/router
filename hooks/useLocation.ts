import { useHistory } from '.'

export function useLocation() {
  return useHistory().slice(-1)[0] || {}
}
