import React from "react";
import { Link } from "wouter";

const Home = () => {
  const HandleClick = () => {
    document.querySelector('.menu-difficulty').classList.toggle('hide')
    document.querySelector('.menu-mode').classList.toggle('hide')
  }

  return (
    <>
      <article className="contMenu">
        <div className="menu">
          <img src="" alt=""></img>
          <h1>KNUCKLEBONES</h1>
          <div className="menu-mode">
            {/* <Link href="/PJvsCPU"> */}
              <button className="menuOption" onClick={HandleClick} >VS CPU</button>
            {/* </Link> */}
            <Link href="/PJvsPJ">
              <button className="menuOption">VS PJ2</button>
            </Link>
          </div>
          <div className="menu-difficulty hide">
            <h3>Dificultad</h3>
            <div>
            <Link href="/PJvsCPU/facil">
              <button className="menuOption">Facil</button>
            </Link>
            <Link href="/PJvsCPU/medio">
              <button className="menuOption">Medio</button>
            </Link>
            <Link href="/PJvsCPU/dificil">
              <button className="menuOption">Dificil</button>
            </Link>
            <button className="menuOption" onClick={HandleClick}>Volver</button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default Home