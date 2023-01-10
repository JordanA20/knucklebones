import React, {useContext} from 'react'
import Dice from './Dice'
import useModal from '../../hooks/useModal'
import PlayerContext from '../../context/PlayerContext'


const PlayerSection = ({pj, level = 'facil'}) => {
  
  const {playerData} = useContext(PlayerContext)

  playerData[1].name= level === 'facil' ? 'Victor' : 
                      level === 'medio' ? 'Victor Skull' : 'El Rey Invictus' 
  

  useModal()

  const HandleShowModal = e =>{ 
    e.preventDefault()
    SetModal()
  }


  const SetModal = () => {
    document.querySelector('.mdlHead').firstChild.textContent = '¿SALIR AL MENU?'
    document.querySelector('.mdlBody').firstChild.textContent = `Se perdera el progreso actual`
    document.querySelector('.mdlFooter').firstChild.textContent = 'Continuar'
    document.querySelector('.mdlFooter').lastChild.textContent = 'Salir'
    document.querySelector('.mdlQuestions').parentElement.classList.remove('hide')
  
    if(!document.querySelector('.mdlBody-total').classList.contains('hide')) 
    document.querySelector('.mdlBody-total').classList.add('hide')
  }
  
  return (
    <>
      <section className={`playerSection pj${pj}`}>
        {pj === 1 ?
            <div className="btnOptions z-50" onClick={HandleShowModal}>
              <div className='lineBtn'></div>
              <div className='lineBtn'></div>
              <div className='lineBtn'></div>
            </div>
        : null }
        <div className='player'>
          { pj === 2 ? 
          <div>
            <div className='playerImg'>
              <img src={`/cpu-${level}.svg`} alt='character'></img>
            </div>
            <h5 className='playerName'>{playerData[1].name}</h5>
          </div>
          : 
          <div>
            <div className='playerImg'>
              <img src='/player.svg' alt='character'></img>
            </div>
              <h5 className='playerName'>Issac</h5>
          </div>
          }
          <div className='totalScore'></div>
        </div>
        <div className='contDiceBox'>
          <div className='diceBox'>
            <div className='diceBox-border'>
              <Dice player={pj}/>
            </div>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default PlayerSection