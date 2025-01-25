import { configureStore } from '@reduxjs/toolkit' 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import formOptions from '../reducers/formOptionsReducer.js'
import formSelected from '../reducers/formSelectedOptionsReducer.js'
import listingsPage from '../reducers/listingPageReducer.js'
import searchResult from '../reducers/searchResultReducer.js'	
import notification from '../reducers/notificationReducer.js'
import user from '../reducers/userReducer.js'

const persistConfig = {
    storage
}
  
const persistedSearchResultReducer = persistReducer({ ...persistConfig, key: 'searchResult' }, searchResult)
const persistedUserReducer = persistReducer({ ...persistConfig, key: 'user' }, user)

const store = configureStore({
  reducer: {
    formOptions,
    formSelected,
    listingsPage,
    notification,
    searchResult: persistedSearchResultReducer,
    user: persistedUserReducer,
  }, 
  middleware: (getDefaultMidleware) => 
    getDefaultMidleware({
      serializableCheck: false
    }) 
})

const persistor = persistStore(store)

export {store, persistor}