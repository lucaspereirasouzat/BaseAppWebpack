import React, { memo } from "react";
import BaseComponent from "components/BaseComponent";

const Home = memo(() => (
  <BaseComponent >

    <h1>Projeto shell</h1>
    <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
      {/* <img src={require('../assets/shell.jpeg')} style={{ width: '100vw' }} /> */}

    </div>
  </BaseComponent>
)
  , false)

export default Home


