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
import Chat from './components/Chat/Chat';
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
import FiltersPage from './components/Filters/FiltersPage';
import FavoriteListingsPage from './components/FavoriteListings/FavoriteListingsPage';
import { displayNotification } from './reducers/notificationReducer';
import { persistor } from './configure/configureStore';

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
    if (user.accessToken) {
      authService.getUserInfo().then(result => {
        if (result.status === 200) {
          dispatch(setUser(result.data))
        } else {
          dispatch(clearUser())
        }
      }).catch(error => {
        persistor.purge();
        dispatch(clearUser())
      })
      searchFormService.getFormOptions().then(result => {
        dispatch(setFormOptions(result))
      })
    }
  }, [])


  return (
    <>
      <DefaultStyle>
        <ContentWrap>
          <Header />
          <Notification />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listings' element={<ListingsPage />} />
            <Route path='/listings/:data' element={<ListingsPage />} /> 
            <Route path="/listing/:id" element={<Listing />} />
            <Route path='/editListing/:id' element={<EditListing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/mylistings' element={<UserListings />} />
            <Route path='/createListing' element={<CreateListing />} />
            <Route path='/chatList' element={<Chat />} />
            <Route path='/chatList/:id' element={<Chat />} />
            <Route path='/favorite/filters' element={<FiltersPage />} />
            <Route path='/favorite/listings' element={<FavoriteListingsPage />} />
          </Routes>
        </ContentWrap>
        <Footer />
      </DefaultStyle>
    </>
  )
}

export default App
