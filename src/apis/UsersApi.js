import { refreshPage } from '../utils/Global'
import Axios from './Axios'

export const login = async (formData) => {
  try {
    const res = await Axios({ url: '/token/', method: 'post', data: formData })
    localStorage.access = res.data.access
    localStorage.refresh = res.data.refresh
    return res
  } catch {
    throw Error(
      'login error, please ensure that you have filled in your username and password correctly.'
    )
  }
}

export const postUser = async (formData) => {
  return await Axios({ url: '/users/', method: 'post', data: formData })
}

export const logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  refreshPage()
}
