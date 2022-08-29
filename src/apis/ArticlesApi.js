import Axios from './Axios'
import { axiosWithAccessToken } from './Token'

// no restriction
export const getArticleList = async () => {
  return await Axios('/articles/')
}

// need article id
export const getArticleById = async (articleId) => {
  return await Axios(`/articles/${articleId}/`)
}

// need jwt token
export const postArticle = async (formData) => {
  try {
    await axiosWithAccessToken('/articles/', 'post', formData)
  } catch (e) {
    throw e
  }
}

// need jwt token and article id
export const editArticle = async (articleId, formData) => {
  try {
    await axiosWithAccessToken(`/articles/${articleId}/`, 'patch', formData)
  } catch (e) {
    throw e
  }
}

export const deleteArticle = async (articleId) => {
  try {
    await axiosWithAccessToken(`/articles/${articleId}/`, 'delete')
  } catch (e) {
    throw e
  }
}
