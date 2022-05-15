import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constant'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    const [user_data] = data

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user_data,
    })

    localStorage.setItem('userInfo', JSON.stringify(user_data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.respone.data.message
          ? error.respone.data.message
          : error.response,
    })
  }
}
