import { Routes, Route } from 'react-router-dom' 
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ListingsPage from './components/ListingsPage/SearchResultPage/ListingsPage'
import Listing from './components/Listing/Listing'
import CreateListing from './components/ListingsPage/ListingsCRUD/CreateListing/CreateListing';
import UserListings from './components/ListingsPage/ListingsCRUD/UserListings';
import EditListing from './components/ListingsPage/ListingsCRUD/UpdateListing/EditListing';
import SearchForm from './components/Search/SearchForm';
import { createGlobalStyle } from 'styled-components'
import { useEffect } from 'react';
import authService from './services/authenticationsService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import Notification from './components/Notification';
import { setFormOptions } from './reducers/formOptionsReducer';
import searchFormService from './services/searchFormService';
import { clearUser } from './reducers/userReducer';
import Footer from './components/Footer/Footer';
import styled from 'styled-components';

const Default = createGlobalStyle`
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
  background-color: #E2323D;
}
`

const DefaultStyle = styled.div`

  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrap = styled.div`
  flex: 1;
  `
function App() {
  const dispatch = useDispatch()
  const user = useSelector(o => o.user)
  const formOptions = useSelector(o => o.formOptions)

  useEffect(() => {
    authService.getUserInfo().then(result => {  
      console.log(result)
      dispatch(setUser(result))
    }).catch(error => {
      console.log(error)
      dispatch(clearUser())
    })

    searchFormService.getFormOptions().then(result => {
        dispatch(setFormOptions(result))
    })

}, [])


  return (
    <>
    <Default /> 
      <DefaultStyle>
        <ContentWrap>
      <Header/>
      <Notification/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<SearchForm/>}/>
            <Route path='/listings' element={<ListingsPage/>}/>
            <Route path="/listing/:id" element={<Listing/>}/>
            <Route path='/editListing/:id' element={<EditListing/>}/>
            <Route path='/about' element/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element/>
            <Route path='/mylistings' element={<UserListings/>}/>
            <Route path='/createListing' element={<CreateListing/>}/>
          </Routes>
        </ContentWrap>
        <Footer/>
        </DefaultStyle>
    </>
  )
}

export default App
