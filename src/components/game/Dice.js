import React, { useEffect, useContext } from 'react'
import GameContext from '../../context/GameContext'

import PlayerContext from '../../context/PlayerContext'

const Dice = ({player}) => {
  const {turn, setDice, dice, setEnabled} = useContext(GameContext) 
  const {playerData} = useContext(PlayerContext)
  
  useEffect( () => {
    let diceContent = document.querySelector(`#diceP${player}`)

    if (turn === 2){
      document.querySelector('.firstP').classList.add('activated')
      document.getElementsByClassName('secondP')[1].classList.remove('activated')
    } else {
      document.querySelector('.firstP').classList.remove('activated')
      document.getElementsByClassName('secondP')[1].classList.add('activated')
    }

    if(player !== turn) {
      diceContent.classList.add('hide')
      if(!diceContent.classList.contains('face0'))
        diceContent.classList.replace(`face${playerData[player-1].diceValue}`, 'face0')
    }
    if(player === turn && diceContent.classList.contains('hide'))
      diceContent.classList.remove('hide')
  }, [player, turn, playerData])

  const handleRamdonDice = e => {
    e.preventDefault()
    let diceContent, cont, dv
    if(player === turn) {
      dv = Math.floor(Math.random()*(6-1+1)+1)
      playerData[player-1].diceValue = dv
      diceContent = document.querySelector(`#diceP${player}`)
      diceContent.classList.replace(`face0`, `face${dv}`)
      cont = diceContent.parentElement.innerHTML
      diceContent = cont.substring(0, cont.indexOf('" ')) + cont.substring(cont.indexOf('">'))
      
      if(dice === diceContent.toString()) setDice(null)
      setTimeout(() => { 
        setDice(diceContent.toString())
        setEnabled(true)
      }, 600)
    }
  }

  return (
    <>
      <div
        className={`dice face${playerData[player-1].diceValue}`}
        id={`diceP${player}`}
      >
        <div className='dot' id='d1'></div>
        <div className='dot' id='d2'></div>
        <div className='dot' id='d3'></div>
        <div className='dot' id='d4'></div>
        <div className='dot' id='d5'></div>
        <div className='dot' id='d6'></div>
        <div onAnimationEnd= {handleRamdonDice}
        className='dot' id='d7'></div>
      </div>
    </>
  )
}

export default Dice