import { useNavigate } from 'react-router-dom'
import {
  URL_LOGIN_PREFIX,
  URL_ARTICLE_DETAIL_PREFIX,
  URL_ARTICLE_EDIT_PREFIX,
  URL_ARTICLE_LIST_PREFIX,
  URL_ARTICLE_POST_PREFIX,
  URL_REGISTER_PREFIX,
} from '../utils/nav-router'

export const useNavRouter = () => {
  const navigate = useNavigate()

  const navToLogin = () => () => navigate(`${URL_LOGIN_PREFIX}`)
  const navToRegister = () => () => navigate(`${URL_REGISTER_PREFIX}`)
  const navToArticleList = () => () => navigate(`${URL_ARTICLE_LIST_PREFIX}`)
  const navToArticlePost = () => () => navigate(`${URL_ARTICLE_POST_PREFIX}`)
  const navToArticleEdit = (articleId) => () =>
    navigate(`${URL_ARTICLE_EDIT_PREFIX}${articleId}/`)
  const navToArticleDetail = (articleId) => () =>
    navigate(`${URL_ARTICLE_DETAIL_PREFIX}${articleId}/`)

  return {
    navToLogin,
    navToRegister,
    navToArticleList,
    navToArticlePost,
    navToArticleEdit,
    navToArticleDetail,
  }
}
