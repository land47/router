import { useContext } from 'react'
import { CacheContainerContext } from '../contexts'
import { CacheContainer } from '../base'

export function useCache<Key, Value>() {
  return useContext(CacheContainerContext) as CacheContainer<Key, Value>
}
