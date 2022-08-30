import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'

import { useNavRouter } from '../../../hooks/useNavRouter'

import {
  editArticle,
  getArticleById,
  postArticle,
} from '../../../apis/ArticlesApi'

import TipsModal, { useTipsModal } from '../../../components/common/TipsModal'

const ArticleAddOrEditForm = ({
  isAddPattern,
  handleSubmit,
  articleId = 0,
}) => {
  const initArticle = {
    title: '',
    content: '',
  }

  const [article, setArticle] = React.useState(initArticle)

  React.useEffect(() => {
    if (!isAddPattern) {
      getArticleById(articleId).then((res) => setArticle(res.data))
    }
  }, [isAddPattern, articleId])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Article Title</Form.Label>
        <Form.Control
          name='title'
          type='text'
          placeholder='title'
          required={isAddPattern}
          disabled={!isAddPattern}
          defaultValue={article.title}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Article Content</Form.Label>
        <Form.Control
          name='content'
          as='textarea'
          rows={3}
          required={isAddPattern}
          defaultValue={article.content}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Article Cover</Form.Label>
        <Form.Control name='cover' type='file' required={isAddPattern} />
      </Form.Group>
      <Form.Group className='d-grid gap-2'>
        <Button type='submit' variant='primary' size='lg'>
          {isAddPattern ? `Post Article` : `Edit Article`}
        </Button>
      </Form.Group>
    </Form>
  )
}

const ArticleAddOrEdit = ({ isAddPattern }) => {
  const { articleId } = useParams()
  const { navToArticleList } = useNavRouter()
  const { show, content, setShow, showMessage } = useTipsModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', e.target.title.value)
    formData.append('content', e.target.content.value)
    e.target.cover.files[0] && formData.append('cover', e.target.cover.files[0])
    try {
      isAddPattern
        ? await postArticle(formData)
        : await editArticle(articleId, formData)
      navToArticleList()()
    } catch (e) {
      showMessage({
        title: 'error',
        detail: e.message,
      })
    }
  }
  return (
    <main>
      <TipsModal content={content} onHide={() => setShow(false)} show={show} />
      {isAddPattern ? (
        <ArticleAddOrEditForm
          isAddPattern={isAddPattern}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ArticleAddOrEditForm
          isAddPattern={isAddPattern}
          handleSubmit={handleSubmit}
          articleId={articleId}
        />
      )}
    </main>
  )
}

export default ArticleAddOrEdit
