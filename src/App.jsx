import { Routes, Route } from 'react-router-dom' 
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ListingsPage from './components/ListingsPage/ListingsPage'
import Listing from './components/Listing/Listing'
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
          <Route path='/search' element={<Search/>}/>
          <Route path='/listings' element={<ListingsPage/>}/>
          <Route path="/listing/:id" element={<Listing/>}/>
          <Route path='/about' element/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element/>
        </Routes>
    </>
  )
}

export default App
