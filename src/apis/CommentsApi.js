import { axiosWithAccessToken } from './Token'

export const postComment = async (articleId, formData) => {
  try {
    const res = await axiosWithAccessToken(
      `/articles/${articleId}/comments/`,
      'post',
      formData
    )
    return res
  } catch (e) {
    throw e
  }
}
