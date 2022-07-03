import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productUpdateReducer,
} from './reducer/productReducers'
import {
  userDetailReducer,
  userLoginReducer,
  userUpdateReducer,
} from './reducer/userReducers'

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
    userUpdate: userUpdateReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),

  preloadedState: initialState,
})

export default store
