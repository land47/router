import { useContext } from 'react'
import { CacheContext } from '../contexts'

export function useCache() {
  return useContext(CacheContext)
}
