import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit' 
import { Provider } from 'react-redux'
import formOptions from './reducers/formOptionsReducer.js'
import formSelected from './reducers/formSelectedOptionsReducer.js'
import listingsPage from './reducers/listingPageReducer.js'
import searchResult from './reducers/searchResultReducer.js'	
import user from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    formOptions,
    formSelected,
    listingsPage,
    searchResult,
    user
  }, 
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
)


// red color #E2323D