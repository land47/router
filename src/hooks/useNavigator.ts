import { useContext } from 'react'
import { NavigatorContext } from '../contexts'

export function useNavigator() {
  let navigator = useContext(NavigatorContext)

  if (navigator === null) {
    throw new Error('The application must be wrapped in <Router />')
  }

  return navigator
}
