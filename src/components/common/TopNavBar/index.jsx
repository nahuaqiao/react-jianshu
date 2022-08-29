import React from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { getLoggedInUserName } from '../../../apis/Token'

function TopNavBar() {
  const [loggedIn, setLoggedIn] = React.useState({
    isLoggedIn: false,
    username: 'AnonymousUser',
  })

  const navToLoginPage = () => {}

  React.useEffect(() => {
    getLoggedInUserName()
      .then((username) => {
        setLoggedIn({ isLoggedIn: true, username })
      })
      .catch((reason) => {
        setLoggedIn({ isLoggedIn: false, username: 'AnonymousUser' })
        console.log('reason', reason)
      })
  }, [])

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#'>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll></Nav>

          <div className='d-flex'>
            {loggedIn.isLoggedIn ? (
              <Button variant='outline-success' onClick={navToLoginPage}>
                {loggedIn.username}
              </Button>
            ) : (
              <Button variant='outline-success'>{'Login'}</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNavBar
