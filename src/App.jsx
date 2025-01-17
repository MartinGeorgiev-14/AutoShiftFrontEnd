import { Routes, Route } from 'react-router-dom' 
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import { createGlobalStyle } from 'styled-components'
import TopBackground from './components/TopBackground';

const DefaultStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
`


function App() {


  return (
    <>
      <DefaultStyle/>

      <TopBackground/>
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
