import { useSafeContext } from '.'
import { PopoutContext } from '../contexts'

export let usePopout = () => useSafeContext(PopoutContext)
