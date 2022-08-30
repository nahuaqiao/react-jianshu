import React from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Axios from '../../../apis/Axios.js'

import { useNavRouter } from '../../../hooks/useNavRouter.jsx'
import { timestamp2format } from '../../../utils/time-format.js'

const ListItem = ({ article }) => {
  const { navToArticleDetail } = useNavRouter()
  return (
    <ListGroup.Item
      onClick={navToArticleDetail(article.id)}
      style={{ cursor: 'pointer' }}
      as='li'
      className='d-flex justify-content-between align-items-start'>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>{article.title}</div>
        {article.content}
        <div>{`Created by: ${article.user}, when: ${timestamp2format(
          article.created
        )}`}</div>
      </div>

      <Badge bg='primary' pill>
        {`${article.comments.length}`}
      </Badge>
    </ListGroup.Item>
  )
}

const ArticleList = () => {
  const [articleList, setArticleList] = React.useState([])
  React.useEffect(() => {
    Axios('/articles/').then((res) => {
      setArticleList(res.data.sort((a, b) => b.created - a.created))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <ListGroup as='ul'>
        {articleList.map((article) => (
          <ListItem key={article.id} article={article} />
        ))}
      </ListGroup>
    </main>
  )
}

export default ArticleList
