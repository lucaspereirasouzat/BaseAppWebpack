import React, { useReducer } from "react";
import BaseComponent from "../components/BaseComponent";

const Home = () => {

  return (
    <BaseComponent >

      <h1>Projeto shell</h1>
      <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
        {/* <img src={require('../assets/shell.jpeg')} style={{ width: '100vw' }} /> */}

      </div>
    </BaseComponent>
  )
}

export default Home


