import { applyMiddleware } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userDetailReducer, userLoginReducer } from './reducer/userReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

const middleware = [thunk]
const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userDetail: userDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),

  preloadedState: initialState,
})

export default store
