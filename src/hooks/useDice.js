import { useEffect } from "react";

const useDice = ({player}, turn) => {

  useEffect( () => {
    let dice = document.querySelector(`#diceP${player}`)
    if(player !== turn)
      dice.classList.add('hide')
    if(player === turn && dice.classList.contains('hide'))
      dice.classList.remove('hide')
  }, [player, turn])
}

export default useDice

