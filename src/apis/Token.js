import Axios from './Axios'

const VERIFY_TOKEN_URL = '/token/verify/'
const REFRESH_TOKEN_URL = '/token/refresh/'

const isTokenValid = async (token) => {
  try {
    const res = await Axios({
      url: VERIFY_TOKEN_URL,
      method: 'post',
      data: { token },
    })
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

const refreshAccessToken = async (refresh) => {
  const accessRes = await Axios({
    url: REFRESH_TOKEN_URL,
    method: 'post',
    data: { refresh },
  })
  localStorage.access = accessRes.access
  return accessRes.access
}

const getAccessToken = async () => {
  try {
    if (!!localStorage.access) {
      const accessTokenIsValid = await isTokenValid(localStorage.access)
      if (accessTokenIsValid) {
        return localStorage.access
      }
    } else if (!!localStorage.refresh) {
      const refreshTokenIsValid = await isTokenValid(localStorage.refresh)
      if (refreshTokenIsValid) {
        return refreshAccessToken(localStorage.refresh)
      }
    }
    throw new Error()
  } catch {
    throw new Error('No token is available on the local browser.')
  }
}

export const axiosWithAccessToken = async (url, method, data = null) => {
  try {
    const accessToken = await getAccessToken()
    const res = await Axios({
      url,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/multipart/form-data;',
      },
      data,
    })
    return res
  } catch (e) {
    throw e
  }
}

const b64_to_utf8 = (str) => {
  return decodeURIComponent(window.atob(str))
}

export const getUserIdFromToken = (token) => {
  return JSON.parse(b64_to_utf8(token.split('.')[1])).user_id
}
export const getUserNameById = async (userId) => {
  try {
    const res = await Axios(`/users/${userId}/`)
    return res.data.username
  } catch (e) {
    throw new Error('invalid token.')
  }
}

export const getLoggedInUserName = async () => {
  try {
    const accessToken = await getAccessToken()
    const userId = getUserIdFromToken(accessToken)
    const username = await getUserNameById(userId)
    return username
  } catch (e) {
    throw e
  }
}
