import React from 'react'
import Game from './pages/Game'
import Home from './pages/Home'
import { GameContextProvider } from './context/GameContext'
import PlayerContext from './context/PlayerContext'
import './App.css'
import {Route} from 'wouter'

function App() {
  return (
    <div className="App">
      <section className="container">
        <GameContextProvider>
          <PlayerContext.Provider value={{
            playerData: [
              {name: 'Victor', score: 0, diceValue: 0,},
              {name: 'Sr. S', score: 0, diceValue: 0,}
            ]
          }}>
            <Route 
              component= {Home}
              path= '/' />
            <Route
              component= {Game}
              path= '/:mode/:level'/>
            <Route
              component= {Game}
              path= '/:mode'/>
          </PlayerContext.Provider>
        </GameContextProvider>
      </section>
    </div>
  );
}

export default App;
