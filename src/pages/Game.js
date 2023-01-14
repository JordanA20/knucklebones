import React, { useContext } from 'react';
import { Link } from 'wouter';
import Board from '../components/game/Board'
import PlayerSection from '../components/game/PlayerSection';
import useModal from '../hooks/useModal';
import GameContext from '../context/GameContext'
import PlayerContext from '../context/PlayerContext';

const Game = ({params = {mode: undefined, level: undefined}}) => {
  const {mode, level} = params
  const {turn, setTurn} = useContext(GameContext)
  const {playerData} = useContext(PlayerContext)
  useModal()

  const HandleHiddenModal = e =>{ 
    e.preventDefault() 
    document.querySelector('.mdlQuestions').parentElement.classList.add('hide')
    if(turn === null) setTurn(Math.floor(Math.random()*(2-1+1)+1))
  }
  const HandleClick = e => { e.preventDefault(); setTurn(0) }

  return (
    <>
      <section className='playingField'>
        {/* Fist player */}
        <PlayerSection pj={1}/> 
        {/* Board Section */}
        <Board mode={mode} level={level}/>
        {/* Second player */}
        <PlayerSection pj={2} level={level}/>
      </section>

      {/* Modals */}
      <section>
        <article className='mdlQuestions z-100'>
          <div className='mdlHead'>
            <h3>¿SALIR AL MENU?</h3>
          </div>
          <div className='mdlBody'>
            <p>Se perdera el progreso actual</p>
            <div className='mdlBody-total hide'>
              <div className='total-pjScore'> {playerData[0].name}
                <p>0</p>
              </div>
              <div className='total-pjScore'> {playerData[1].name}
                <p>0</p>
              </div>
            </div>
          </div>
          <div className='mdlFooter'>
            <button className='mdlOption' onClick={HandleHiddenModal}>Continuar</button>
            <Link href='/' onClick={HandleClick}>
              <button className='mdlOption'>Salir</button>
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}

export default Game