import Axios from './Axios'

export const login = async (formData) => {
  try {
    const res = await Axios({ url: '/token/', method: 'post', data: formData })
    localStorage.access = res.data.access
    localStorage.refresh = res.data.refresh
    return res
  } catch {
    throw Error('login failed, check username and password.')
  }
}

export const postUser = async (formData) => {
  return await Axios({ url: '/users/', method: 'post', data: formData })
}
