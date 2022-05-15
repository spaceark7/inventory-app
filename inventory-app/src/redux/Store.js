import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducer/userReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

const middleware = [thunk]
const store = configureStore(
  {
    reducer: {
      userLogin: userLoginReducer,
    },
  },
  initialState,
  composeWithDevTools(applyMiddleware([...middleware]))
)

export default store
