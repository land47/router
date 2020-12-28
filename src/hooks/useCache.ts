import { useContext } from 'react'
import { CacheContainerContext } from '../contexts'

export function useCache() {
  return useContext(CacheContainerContext)
}
