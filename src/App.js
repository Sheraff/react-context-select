import { memo, useState, createContext as reactCreateContext } from 'react'
import { createContext, useContext } from './CustomContext'
import './styles.css'

const Context = createContext({ a: 0 })
const RegularContext = reactCreateContext('regular')

export default function App() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)
  const [c, setC] = useState(3)
  const [e, setE] = useState([0])
  return (
    <div className="App">
      <button onClick={() => setA((a) => a + 1)}>increment A</button>
      <button onClick={() => setB((b) => b + 1)}>increment B</button>
      <button onClick={() => setC((c) => c + 1)}>increment C</button>
      <button onClick={() => setE((e) => [...e, e.length])}>increment E</button>
      <Regular />
      <MemoItemA />
      <Context.Provider value={{ a, b, c, d: { e } }}>
        <MemoItemA />
        <MemoItemBC />
        <MemoItemBC2 />
        <MemoItemE />
        <Context.Provider value={{ a: 5 }}>
          <MemoItemA />
        </Context.Provider>
      </Context.Provider>
    </div>
  )
}

function Regular() {
  const text = useContext(RegularContext)
  return <div>{text}</div>
}

function ItemA() {
  const a = useContext(Context, ({ a }) => a)

  return (
    <div>
      a:{a} - {Date.now()}
    </div>
  )
}
const MemoItemA = memo(ItemA)

function ItemBC() {
  const { b, c } = useContext(Context, (state) => ({
    b: state.b,
    c: state.c,
  }))

  return (
    <div>
      b:{b}, c:{c} - {Date.now()}
    </div>
  )
}
const MemoItemBC = memo(ItemBC)

function ItemBC2() {
  const b = useContext(Context, ({ b }) => b)
  const c = useContext(Context, ({ c }) => c)

  return (
    <div>
      b:{b}, c:{c} - {Date.now()}
    </div>
  )
}
const MemoItemBC2 = memo(ItemBC2)

function ItemE() {
  const e = useContext(Context, ({ d }) => d.e)

  return (
    <div>
      e:{e[e.length - 1]} - {Date.now()}
    </div>
  )
}
const MemoItemE = memo(ItemE)
