import { useSyncExternalStore } from 'react'

export const createStore = <Shape>(initialState: Shape) => {
  let currentState = initialState
  const listeners = new Set<(state: Shape) => void>()
  const subscribe = (listener: (state: Shape) => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const updater = (newState: Shape | ((prev: Readonly<Shape>) => Shape | undefined)) => {
    const s = typeof newState == 'function' ? (newState as any)(currentState) : newState
    if (typeof s === 'undefined') return
    currentState = s
    listeners.forEach((listener) => listener(currentState))
  }

  return {
    getState: () => currentState,
    setState: (newState: Shape | ((prev: Readonly<Shape>) => Shape | undefined)) => {
      updater(newState)
    },
    setValue: <T extends keyof Shape>(key: T, value: (typeof currentState)[T]) => {
      const f = (prev: Shape) => ({
        ...prev,
        [key]: value,
      })
      updater(f)
    },
    subscribe,
    useStore: <SelectorOutput>(selector: (state: Shape) => SelectorOutput): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(initialState),
      ),
  }
}

export default createStore
