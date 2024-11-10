import { Routes, Route } from 'react-router-dom' 
import Home from './components/Home';
import Header from './components/Header/Header'
import { createGlobalStyle } from 'styled-components'

const DefaultStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  height: 100vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto
}
`


function App() {


  return (
    <>
      <DefaultStyle/>

      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/detailedSearch' element/>
          <Route path='/about' element/>
          <Route path='/login' element/>
          <Route path='/register' element/>
          <Route path='/profile' element/>
        </Routes>
    </>
  )
}

export default App
