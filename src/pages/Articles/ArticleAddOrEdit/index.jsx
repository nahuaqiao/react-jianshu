import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
  editArticle,
  getArticleById,
  postArticle,
} from '../../../apis/ArticlesApi'

const ArticleAddOrEditForm = ({ isAddPattern, handleSubmit, article = {} }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Article Title</Form.Label>
        <Form.Control
          name='title'
          type='text'
          placeholder='title'
          required={isAddPattern}
          readOnly={isAddPattern}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Article Content</Form.Label>
        <Form.Control
          name='content'
          as='textarea'
          rows={3}
          required={isAddPattern}
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

const ArticleAddOrEdit = ({ isAddPattern, articleId = NaN }) => {
  const [article, setArticle] = React.useState()

  React.useEffect(() => {
    if (isAddPattern) {
      getArticleById(articleId).then((res) => setArticle(res.data))
    }
  }, [isAddPattern, articleId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', e.target.title.value)
    formData.append('content', e.target.content.value)
    formData.append('cover', e.target.cover.value)
    try {
      const res = isAddPattern
        ? await postArticle(formData)
        : await editArticle(formData)

      console.log('res', res)
      // nav to article list page.
    } catch (e) {
      // current user don't have edit or add permission
      console.log(e)
    }
  }
  return (
    <main>
      {isAddPattern ? (
        <ArticleAddOrEditForm
          isAddPattern={isAddPattern}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ArticleAddOrEditForm
          isAddPattern={isAddPattern}
          handleSubmit={handleSubmit}
          article={article}
        />
      )}
    </main>
  )
}

export default ArticleAddOrEdit
