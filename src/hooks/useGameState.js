import { useEffect, useState, useContext } from "react";
import PlayerContext from '../context/GameContext'

const useGameState = (player, state) => {
  
  const [gameState, setGameState] = useState('start')
  const {turn, setTurn, setHidden, setDice} = useContext(PlayerContext)

  useEffect( () => {
    const wipeBoard = () => {
      for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('scores')[0].children[i].value = 0
        document.getElementsByClassName('scores')[1].children[i].value = 0
  
        for (let y = 0; y < 3; y++) {
          document.getElementsByClassName('board')[0].children[i].children[y].innerHTML = ''
          document.getElementsByClassName('board')[1].children[i].children[y].innerHTML = ''
        }
        if(i<2) {
          document.getElementsByClassName('totalScore')[i].textContent = 0
          player[i].score = 0
        }
      }
    }

    const SetModal = (ganador) => {
      document.querySelector('.mdlHead').firstChild.textContent = 'VICTORIA'
      document.querySelector('.mdlBody').firstChild.textContent = `El ${ganador} jugador es el vencedor`
      document.querySelector('.mdlFooter').firstChild.textContent = 'Reintentar'
      document.querySelector('.mdlFooter').lastChild.textContent = 'Salir'
      document.querySelector('.mdlQuestions').parentElement.classList.remove('hide')

      if(document.querySelector('.mdlBody-total').classList.contains('hide')) 
        document.querySelector('.mdlBody-total').classList.remove('hide')

      document.getElementsByClassName('total-pjScore')[0].lastChild.textContent = player[0].score
      document.getElementsByClassName('total-pjScore')[1].lastChild.textContent = player[1].score
    }
    
    if(state && player[0].score > 0) {
      
      player[0].score > player[1].score ?
      setTimeout(() => { SetModal('primer') }, 700) :

      player[0].score < player[1].score ?
      setTimeout(() => { SetModal('segundo') }, 700) : 
      SetModal(null)

      setGameState('end')
      setTimeout(() => { wipeBoard() }, 700);
      document.querySelector(`#diceP${turn}`).classList.add('hide')
      setTurn(null)
    }
    else if(!state) { 
      if(turn !== null) setTurn(Math.floor(Math.random()*(2-1+1)+1))
      setDice('')
      setHidden(true)
      wipeBoard()
    }
  }, [gameState, player, state, setTurn, setHidden])

  return gameState
}

export default useGameState