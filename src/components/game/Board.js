import React, {useContext, useEffect, useState} from 'react'
import GameContext from '../../context/GameContext'
import PlayerContext from '../../context/PlayerContext'
import useGameState from '../../hooks/useGameState'

const Board = ({mode, level}) => {
  const {turn, setTurn, dice, enabled, setEnabled} = useContext(GameContext)
  const {playerData} = useContext(PlayerContext)
  const [gameOver, setGameOver] = useState(false)

  const gameState = useGameState(playerData, gameOver)
  
  level === 'facil' ? level = 1 : level === 'medio' ? level = 2 :
  level === 'dificil' ? level = 3 : level = undefined

  useEffect( () => {
    document.getElementsByClassName(`totalScore`)[0].textContent = playerData[0].score 
    document.getElementsByClassName(`totalScore`)[1].textContent = playerData[1].score
  }, [playerData, turn])

  useEffect( () => {
    const CPU = () => {
      const board = document.querySelector('.firstP').children
      const diceV = parseInt(dice.substring(21, 22))
      let boxes, box = null

      for (let i = 0; i < board.length; i++) {
        boxes = board[i]
        for (let j = 0; j < boxes.children.length; j++) {
          if (boxes.children[j].innerHTML === dice) {
            Math.floor(Math.random()*((level*4)-1+1)) !== i ? box = i :
            box = null
          }
          if (box !== null) break
        }
        if (box === null || diceV < 3) {
          boxes = document.getElementsByClassName('secondP')[1].children[i]
          for(let j = 0; j < boxes.children.length; j++) {
            if (boxes.children[j].innerHTML === dice) {
              if(Math.floor(Math.random()*((level*4)-1+1)) !== i) 
              box = i
            }
            if (box !== null) break
          }
        }
        if(box !== null) break
        if(i === 2) box = Math.floor(Math.random()*(3-1+1))
      }
      while (board[box].firstChild.innerHTML !== '') {
        box = Math.floor(Math.random()*(3-1+1))
      }
      validateBoxValue(board[box], turn)
      setTurn(1)
    }

    if(gameState === 'end') setGameOver(false)
    if(dice !== null &&
       parseInt(dice.substring(21, 22)) === playerData[1].diceValue &&
       turn === 2 &&
       mode === 'PJvsCPU')
      setTimeout(() => { CPU() }, 500)

  }, [playerData, gameState, dice])
  
  const handledClick = e => {
    e.preventDefault()
    let player = 
    e.target.parentElement.classList.contains('columnBox') ? e.target.parentElement :
    e.target.parentElement.parentElement.classList.contains('columnBox') ? e.target.parentElement.parentElement :
    e.target.parentElement.parentElement.parentElement.classList.contains('columnBox') ? e.target.parentElement.parentElement.parentElement : null

    if(dice !== null && enabled &&
       player.parentElement.classList.contains('board')) {
      if(turn === 1 && player.parentElement.classList.contains('secondP')) {
        validateBoxValue(player, turn)
        setTurn(2)
        player += 1
        setEnabled(false)
      }
      else if(turn === 2 && player.parentElement.classList.contains('firstP')) {
        validateBoxValue(player, turn)
        setTurn(1)
        player -= 1
        setEnabled(false)
      } 
    }
  }
  
  const validateBoxValue = (elem, pj) => {
    let boxes = elem.children, bonus = 0, box = 0
    for (let i = 0; i <= boxes.length; i++) {
      if(pj === 1) {
        if (boxes[i].innerHTML === '') {
          boxes[i].innerHTML = dice
          compareBoxes(elem, boxes[i].firstChild)
          if(i === 2) checkGameOver(elem.parentElement.children)
          box = i
          break
        }
        else if(parseInt(boxes[i].firstChild.classList[1].substring(4)) === parseInt(playerData[pj-1].diceValue)) {
          bonus += 1
          if (bonus === 1)
            boxes[i].firstChild.classList.toggle('double')
          else {
            boxes[0].firstChild.classList.toggle('triple')
            boxes[i].firstChild.classList.toggle('triple')
          }
        }
      }
      else if(pj === 2) {
        if (boxes[pj-i].innerHTML === '') {
          boxes[pj-i].innerHTML = dice
          compareBoxes(elem, boxes[pj-i].firstChild)
          if(i === 2) checkGameOver(elem.parentElement.children)
          box = i
          break
        }
        else if(parseInt(boxes[pj-i].firstChild.classList[1].substring(4)) === parseInt(playerData[pj-1].diceValue)) {
          bonus += 1
          if (bonus === 1)
            boxes[pj-i].firstChild.classList.toggle('double')
          else {
            boxes[2].firstChild.classList.toggle('triple')
            boxes[pj-i].firstChild.classList.toggle('triple')
          }
        }
      }
    }

    let y = pj === 2 ? 0 : 2
    let x = elem.classList[1].substring(2)
    let score = document.querySelector('.results').children[y].children[x-1]
    if(bonus === 0) {
      score.value = parseInt(score.value) + parseInt(playerData[pj-1].diceValue)
      playerData[pj-1].score += parseInt(playerData[pj-1].diceValue)
    }
    else {
      let i = pj === 1 ? 0 : 2
      if (bonus === 1) {
        boxes[Math.abs(box-i)].firstChild.classList.add('double')
      }
      else{
        boxes[Math.abs(box-i)].firstChild.classList.remove('double')
        boxes[Math.abs(box-i)].firstChild.classList.add('triple')
      }

      playerData[pj-1].score -= parseInt(score.value)
      score.value = parseInt(score.value) - ((parseInt(playerData[pj-1].diceValue)*(bonus))*(bonus))
      score.value = parseInt(score.value) + ((parseInt(playerData[pj-1].diceValue)*(bonus+1))*(bonus+1))
      playerData[pj-1].score += parseInt(score.value)
    }
  }

  const compareBoxes = (x, dice) => {
    let n = x.classList[1].substring(2), m, l, bonus = 0
    let boxes = document.getElementsByClassName(`cb${n}`)
    m = turn === 1 ? 0 : 1
    l = m === 1 ? 0 : -2
    for (let i = 0; i < x.children.length; i++) {
      if(boxes[m].children[Math.abs(i+l)].children[0]) {
        if(dice.classList[1] === boxes[m].children[Math.abs(i+l)].children[0].classList[1]) {
          boxes[m].children[Math.abs(i+l)].innerHTML = ''
          bonus += 1
        }
      }
    }
    if(bonus > 0) 
      sortDices(boxes[m].children)

    let score = document.querySelector('.results').children[l+2].children[n-1]
    score.value = parseInt(score.value) - (parseInt(playerData[turn-1].diceValue)*bonus)*bonus
    playerData[1-m].score -= (parseInt(playerData[turn-1].diceValue)*(bonus)) * bonus
  }

  const sortDices = (boxes) => {
    let space = turn === 2 ? 0 : -2,
        m = turn === 2 ? 0 : -2

    for (let i = 0; i < boxes.length; i++) {
      if(boxes[Math.abs(i+m)].innerHTML !== '') {
        if(i === 0) 
          space += 1
        else if(Math.abs(space) !== Math.abs(i+m)) {
          boxes[Math.abs(space)].innerHTML = boxes[Math.abs(i+m)].innerHTML
          boxes[Math.abs(i+m)].innerHTML = ''
          space += 1
        }
      }
    }
  }

  const checkGameOver = (x) => {
    let m = turn === 2 ? 0 : 2
    let end = true
    if(x[0].children[m].innerHTML === '' ||
       x[1].children[m].innerHTML === '' ||
       x[2].children[m].innerHTML === '')
        end = false
    if(end) setGameOver(true)
  }

  return (
    <>
      <section className='boardSection'>
        <div onClick={handledClick} className='board firstP activated'>
          <div className='columnBox cb1'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
          <div className='columnBox cb2'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
          <div className='columnBox cb3'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
        </div>
        <div className='results'>
          <div className='scores firstP'>
            <input className='boxScore' defaultValue={0} readOnly/>
            <input className='boxScore' defaultValue={0} readOnly/>
            <input className='boxScore' defaultValue={0} readOnly/>
          </div>
          <div></div>
          <div className='scores secondP'>
            <input className='boxScore' defaultValue={0} readOnly/>
            <input className='boxScore' defaultValue={0} readOnly/>
            <input className='boxScore' defaultValue={0} readOnly/>
          </div>
        </div>
        <div onClick={handledClick} className='board secondP activated'>
          <div className='columnBox cb1'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
          <div className='columnBox cb2'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
          <div className='columnBox cb3'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Board;