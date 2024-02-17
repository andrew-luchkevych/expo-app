import { ReactNode, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { DimensionsStore } from './store'

export interface DimensionsProviderProps {
  children: ReactNode
}

export const DimensionsProvider = ({ children }: DimensionsProviderProps) => {
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      DimensionsStore.setState({ ...window })
    })
    return sub.remove
  }, [])
  return <>{children}</>
}

export default DimensionsProvider
