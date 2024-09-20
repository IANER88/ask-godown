import { useState } from "react";
import { useStore } from "./store/useStore"

function Home() {

  const store = useStore();
  return (
    <h2>{store.value}</h2>
  )
}

const Demo = () => {
  const store = useStore();
  const onClick = () => {
    store.setValue();
  }

  return (
    <div>
      <h1>{store.value}</h1>
      <button onClick={onClick}>加</button>
    </div>
  )
}

export default function App() {

  const [count, set] = useState(0)

  return (
    <div>
      <Demo />
      <Home />
      <h4>{count}</h4>
      <button onClick={() => {
        set(count + 1)
      }}>coutn</button>
    </div>
  )
}