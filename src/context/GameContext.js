import React, {useState} from 'react'

const Context = React.createContext({})

export function GameContextProvider({children}) {
  const [turn, setTurn] = useState(0)
  const [dice, setDice] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const [hidden, setHidden] = useState(true)

  return <Context.Provider value={{turn, setTurn, dice, setDice, hidden, setHidden, enabled, setEnabled}}>
    {children}
  </Context.Provider>
}

export default Context