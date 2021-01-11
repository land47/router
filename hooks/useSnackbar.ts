import { useSafeContext } from '.'
import { SnackbarContext } from '../contexts'

export let useSnackbar = () => useSafeContext(SnackbarContext)
