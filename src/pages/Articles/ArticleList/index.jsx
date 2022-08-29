import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Axios from '../../../apis/Axios.js'

const ListItem = ({ article }) => {
  return (
    <ListGroup.Item
      as='li'
      className='d-flex justify-content-between align-items-start'>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>{article.title}</div>
        {article.content}
        <div>{`Created by: ${article.user}Created: ${new Intl.DateTimeFormat(
          'en-US',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }
        ).format(article.created * 1000)}`}</div>
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
      setArticleList(res.data)
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
