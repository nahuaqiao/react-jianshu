import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { postUser } from '../../../apis/UsersApi'

import TipsModal from '../../../components/common/TipsModal'

const RegisterForm = ({ handleSubmit }) => {
  const navToLogin = () => {
    // nav to login page.
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name='username'
          type='text'
          placeholder='username'
          required={true}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name='email'
          type='email'
          placeholder='email'
          required={true}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          type='password'
          placeholder='password'
          required={true}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          name='repeatpwd'
          type='password'
          placeholder='repeat password'
          required={true}
        />
      </Form.Group>

      <Form.Group className='d-grid gap-2 mb-3'>
        <Button type='submit' variant='primary' size='lg'>
          {`Register`}
        </Button>
      </Form.Group>
      <Form.Group className=''>
        <Button onClick={navToLogin} variant='link' size='lg'>
          {`Login`}
        </Button>
      </Form.Group>
    </Form>
  )
}

const Register = () => {
  const initialContextState = {
    header: 'header',
    content: 'content',
  }
  const [modalShow, setModalShow] = React.useState(false)
  const [context, setContext] = React.useState(initialContextState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    const repeatpwd = e.target.repeatpwd.value

    if (password !== repeatpwd) {
      setModalShow(true)
      setContext({
        title: 'tips',
        header: 'error',
        content: 'the two passwords are different',
      })
      return
    }

    const formData = new FormData()
    formData.append('username', e.target.username.value)
    formData.append('email', e.target.email.value)
    formData.append('password', e.target.password.value)
    const res = await postUser(formData)
    if (res.status === 201) {
      setContext({
        header: 'success',
        content: 'register succeed!',
      })
    } else {
      setContext({
        header: 'error',
        content: 'register failed.',
      })
    }
    setModalShow(true)
  }

  return (
    <main>
      <RegisterForm handleSubmit={handleSubmit} />
      <TipsModal
        context={context}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </main>
  )
}

export default Register
