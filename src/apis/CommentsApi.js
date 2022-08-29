import { axiosWithAccessToken } from './Token'

export const postComment = async (articleId, { content }) => {
  try {
    await axiosWithAccessToken(`/articles/${articleId}/comments/`, 'post', {
      content,
    })
  } catch (e) {
    throw e
  }
}
