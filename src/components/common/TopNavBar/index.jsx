import React from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { logout } from '../../../apis/UsersApi'
import { getLoggedInUserName } from '../../../apis/Token'

import { useNavRouter } from '../../../hooks/useNavRouter'

const TopNavBar = () => {
  const { navToLogin, navToArticlePost, navToArticleList } = useNavRouter()

  const [loggedIn, setLoggedIn] = React.useState({
    isLoggedIn: false,
    username: 'AnonymousUser',
  })

  const checkLoggedIn = async () => {
    try {
      const username = await getLoggedInUserName()
      setLoggedIn({ isLoggedIn: true, username })
    } catch (reason) {
      setLoggedIn({ isLoggedIn: false, username: 'AnonymousUser' })
    }
  }

  React.useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={navToArticleList()}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll></Nav>

          <div className='d-flex'>
            <ButtonGroup>
              {loggedIn.isLoggedIn ? (
                <>
                  <Button
                    variant='outline-success'
                    onClick={navToArticlePost()}>
                    Post Article
                  </Button>
                  <Button variant='outline-dark'>{`Welcome: ${loggedIn.username}`}</Button>
                  <Button
                    variant='outline-danger'
                    onClick={logout}>{`logout`}</Button>
                </>
              ) : (
                <Button variant='outline-success' onClick={navToLogin()}>
                  {'Login'}
                </Button>
              )}
            </ButtonGroup>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNavBar
