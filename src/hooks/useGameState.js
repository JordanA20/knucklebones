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

    const SetModal = (winner) => {
      document.querySelector('.mdlHead').firstChild.textContent = 'Partida terminada'
      document.querySelector('.mdlBody').firstChild.textContent = `${winner} es el vencedor`
      document.querySelector('.mdlFooter').firstChild.textContent = 'Reintentar'
      document.querySelector('.mdlFooter').lastChild.textContent = 'Salir'
      document.querySelector('.mdlQuestions').parentElement.classList.remove('hide')
      document.getElementsByClassName('total-pjScore')[0].lastChild.textContent = player[0].score
      document.getElementsByClassName('total-pjScore')[1].lastChild.textContent = player[1].score

      if(document.querySelector('.mdlBody-total').classList.contains('hide')) 
        document.querySelector('.mdlBody-total').classList.remove('hide')

    }
    
    if(state && player[0].score > 0) {
      
      player[0].score > player[1].score ?
      setTimeout(() => { SetModal(player[0].name) }, 700) :

      player[0].score < player[1].score ?
      setTimeout(() => { SetModal(player[1].name) }, 700) :
      SetModal(null)

      setGameState('end')
      setTimeout(() => { wipeBoard() }, 750);
      if(document.querySelector(`#diceP${turn}`) !== null)
        document.querySelector(`#diceP${turn}`).classList.add('hide')
      setTurn(null)
    }
    else if(!state) { 
      if(turn !== null) setTurn(Math.floor(Math.random()*(2-1+1)+1))
      setDice('')
      setHidden(true)
      setTimeout(() => { wipeBoard() }, 750);
    }
  }, [gameState, player, state, setTurn, setHidden, setDice])

  return gameState
}

export default useGameState