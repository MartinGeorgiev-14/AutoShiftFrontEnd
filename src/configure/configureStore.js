import { combineReducers, configureStore } from '@reduxjs/toolkit' 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import formOptions from '../reducers/formOptionsReducer.js'
import formSelected from '../reducers/formSelectedOptionsReducer.js'
import listingsPage from '../reducers/listingPageReducer.js'
import searchResult from '../reducers/searchResultReducer.js'	
import notification from '../reducers/notificationReducer.js'
import chatListReducer from '../reducers/chatListReducer.js'
import user from '../reducers/userReducer.js'
import filterReducer from '../reducers/filtersReducer.js'
import favoriteListingsReducer from '../reducers/favoriteListingsReducer.js'

const persistConfig = {
    storage
}
  
const persistedSearchResultReducer = persistReducer({ ...persistConfig, key: 'searchResult' }, searchResult)
const persistedUserReducer = persistReducer({ ...persistConfig, key: 'user' }, user)

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // This resets all reducers
  }

  
  return appReducer(state, action);
};

const appReducer = combineReducers({
    formOptions,
    formSelected,
    listingsPage,
    notification,
    chatListReducer,
    filterReducer,
    favoriteListingsReducer,
    searchResult: persistedSearchResultReducer,
    user: persistedUserReducer,
  })

const store = configureStore({
  reducer: {
    formOptions,
    formSelected,
    listingsPage,
    notification,
    chatListReducer,
    filterReducer,
    favoriteListingsReducer,
    searchResult: persistedSearchResultReducer,
    user: persistedUserReducer,
    reducer: rootReducer
  }, 
  middleware: (getDefaultMidleware) => 
    getDefaultMidleware({
      serializableCheck: false
    }) 
})

const persistor = persistStore(store)

export {store, persistor}