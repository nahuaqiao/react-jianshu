import logo from '../../../logo512.png'

import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { deleteArticle, getArticleById } from '../../../apis/ArticlesApi'
import { postComment } from '../../../apis/CommentsApi'

const ArticleCard = ({ article }) => {
  return (
    <article>
      <Card style={{ width: '50%', margin: '0 auto' }}>
        <Card.Img variant='top' src={logo} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.content}</Card.Text>
          <ButtonToolbar className='justify-content-between'>
            <ButtonGroup>
              <Button variant='primary'>Edit Article</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant='secondary'>Delete Article</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </article>
  )
}

const CommentCreateForm = ({ articleId, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mb-3'>
        <Form.Control
          name='content'
          placeholder='Post a friendly comment!'
          required
        />
        <Button variant='outline-secondary' type='submit'>
          Post Comment
        </Button>
      </InputGroup>
    </Form>
  )
}

const CommentList = ({ comments }) => {
  return (
    <section>
      <ListGroup>
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </ListGroup>
    </section>
  )
}

const CommentListItem = ({ comment }) => {
  return (
    <ListGroup.Item
      as='li'
      className='d-flex justify-content-between align-items-start'>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>{comment.content}</div>
        <div>{`Created: ${new Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(comment.created * 1000)}`}</div>
      </div>
    </ListGroup.Item>
  )
}

const ArticleDetail = ({ articleId }) => {
  const initialArticle = {
    id: -1,
    title: 'fake title',
    content: 'fake content',
    cover: logo,
    created: Date.now(),
    user: 'fake user',
    comments: [
      {
        id: -1,
        content: 'fake comment',
        created: Date.now(),
      },
    ],
  }

  const [article, setArticle] = React.useState(initialArticle)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', e.target.content.value)
    try {
      const res = await postComment(articleId, formData)
      // console.log('res', res)
      setArticle((preArticle) => ({
        ...preArticle,
        comments: preArticle.comments.unshift(res.data),
      }))
      // anywhere need to go
    } catch {
      // current user don't have comment post permission
    }
  }

  const handleEditArticleBtnClick = () => {}

  const handleDeleteArticleBtnClick = async () => {
    try {
      const res = await deleteArticle(articleId)
      console.log('res', res)
    } catch {
      // current user don't have delete permission
    }
  }

  React.useEffect(() => {
    if (articleId) {
      getArticleById(articleId)
        .then((res) => {
          setArticle(res.data)
        })
        .catch((reason) => console.log('reason', reason))
    } else {
    }
  }, [articleId])

  return (
    <main>
      <ArticleCard
        article={article}
        handleEditArticleBtnClick={handleEditArticleBtnClick}
        handleDeleteArticleBtnClick={handleDeleteArticleBtnClick}
      />
      <hr />
      <CommentCreateForm articleId={articleId} handleSubmit={handleSubmit} />
      <CommentList comments={article.comments} />
    </main>
  )
}

export default ArticleDetail
