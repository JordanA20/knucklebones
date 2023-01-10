import { useEffect, useContext } from 'react';
import GameParameters  from '../context/GameContext';

const useModal = () => {
  const {hidden} = useContext(GameParameters)
  
  useEffect(() => {
    hidden ? 
      document.querySelector('.mdlQuestions').parentElement.classList.add('hide') :
      document.querySelector('.mdlQuestions').parentElement.classList.remove('hide')
  }, [hidden])
}

export default useModal