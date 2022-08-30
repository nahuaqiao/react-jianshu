import logo from '../../../logo512.png'

import React from 'react'
import { useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import TipsModal, { useTipsModal } from '../../../components/common/TipsModal'
import { deleteArticle, getArticleById } from '../../../apis/ArticlesApi'
import { postComment } from '../../../apis/CommentsApi'

import { useNavRouter } from '../../../hooks/useNavRouter'
import { timestamp2format } from '../../../utils/time-format'

const ArticleCard = ({
  article,
  handleEditArticleBtnClick,
  handleDeleteArticleBtnClick,
}) => {
  return (
    <article>
      <Card style={{ width: '80%', margin: '0 auto' }}>
        <Card.Img variant='top' src={article.cover} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.content}</Card.Text>
          <hr />
          <Card.Text>{`Created by: ${article.user}, when: ${timestamp2format(
            article.created
          )}`}</Card.Text>
          <ButtonToolbar className='justify-content-between'>
            <ButtonGroup>
              <Button variant='primary' onClick={handleEditArticleBtnClick}>
                Edit Article
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant='secondary' onClick={handleDeleteArticleBtnClick}>
                Delete Article
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </article>
  )
}

const CommentCreateForm = ({ handleSubmit }) => {
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

const ArticleDetail = () => {
  const { articleId } = useParams()

  const initialArticle = {
    id: -1,
    title: 'fake title',
    content: 'fake content',
    cover: 'logo',
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

  /**
   * post a comment for current article
   * @param {event obj} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', e.target.content.value)
    try {
      const res = await postComment(articleId, formData)
      console.log('article', article)
      setArticle((preArticle) => ({
        ...preArticle,
        comments: [].concat([res.data], preArticle.comments),
      }))
    } catch (e) {
      // current user don't have comment post permission
      showMessage({
        title: 'error',
        detail:
          "Anonymous user doesn't have permission to post comments for article, login first plz.",
      })
    }
  }

  const { navToArticleEdit, navToArticleList } = useNavRouter()

  const { show, content, setShow, showMessage } = useTipsModal()

  const handleDeleteArticleBtnClick = async () => {
    if (window.confirm('delete this article?')) {
      try {
        await deleteArticle(articleId)
        navToArticleList()()
      } catch {
        // current user dones't have delete permission
        showMessage({
          title: 'error',
          detail:
            "Current user doesn't have permission to delete this article.",
        })
      }
    }
  }

  React.useEffect(() => {
    getArticleById(articleId).then((res) => {
      setArticle(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <TipsModal content={content} onHide={() => setShow(false)} show={show} />
      <ArticleCard
        article={article}
        handleEditArticleBtnClick={navToArticleEdit(articleId)}
        handleDeleteArticleBtnClick={handleDeleteArticleBtnClick}
      />
      <hr />
      <CommentCreateForm articleId={articleId} handleSubmit={handleSubmit} />
      <CommentList
        comments={article.comments.sort((a, b) => b.created - a.created)}
      />
    </main>
  )
}

export default ArticleDetail
