import { useSafeContext } from '.'
import { CacheContainerContext } from '../contexts'
import { CacheContainer } from '../base'

// prettier-ignore
export let useCache = <Key, Value>() => useSafeContext(CacheContainerContext) as CacheContainer<Key, Value>
