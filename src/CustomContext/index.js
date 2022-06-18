/* eslint-disable react-hooks/rules-of-hooks -- i know what i'm doing */
/* eslint-disable react-hooks/exhaustive-deps -- i know what i'm doing */

import {
  createContext as reactCreateContext,
  useContext as useReactContext,
  useEffect,
  useReducer,
  useRef,
  } from 'react'
import deepEqual from './deepEqual.js'

const stableSelect = Symbol()

export function createContext(initialValue) {
  const Context = reactCreateContext({ value: initialValue })
  const ReactProvider = Context.Provider
  
  const Provider = ({ value, children }) => {
    // Context value is referentially stable
    const sub = useRef({ value, dispatchers: new Set() })
  
    // when value changes, publish to all subscribers
    useEffect(() => {
    if (sub.current.value !== value) {
      sub.current.value = value
      for (const dispatch of sub.current.dispatchers.values()) {
        dispatch(value)
      }
    }
    }, [value])
  
    return <ReactProvider value={sub.current}>{children}</ReactProvider>
  }
  
  Context.Provider = Provider
  delete Context.Consumer // usage w/o hook is not supported
  Context[stableSelect] = true // distinct from regular React.Context
  
  return Context
}
  
const identity = (a) => a
  
export function useContext(context, select = identity) {
  const sub = useReactContext(context)
  
  // allow regular contexts, bypass optimisations
  if (!context[stableSelect]) return select(sub)
  
  const [state, dispatch] = useReducer(
    (state, value) => {
      const selectedValue = select(value)
      const hasChanged = !deepEqual(state, selectedValue)
      return hasChanged ? selectedValue : state
    },
    sub.value,
    select,
  )
  
  // bypass for useContext outside of Context.Provider
  if (sub.dispatchers) {
    // subscribe to changes in value in Context.Provider
    if (!sub.dispatchers.has(dispatch))
      sub.dispatchers.add(dispatch)
  
    // prevent memory leak
    useEffect(() => () => sub.dispatchers.delete(dispatch), [])
  }
  
  return state
}
