import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login, postUser } from '../../../apis/UsersApi'

import TipsModal, { useTipsModal } from '../../../components/common/TipsModal'
import { useNavRouter } from '../../../hooks/useNavRouter'
import { refreshPage } from '../../../utils/Global'

const RegisterForm = ({ handleSubmit }) => {
  const { navToLogin } = useNavRouter()

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
        <Button onClick={navToLogin()} variant='link' size='lg'>
          {`Login`}
        </Button>
      </Form.Group>
    </Form>
  )
}

const Register = () => {
  const { navToArticleList } = useNavRouter()
  const { show, content, setShow, showMessage } = useTipsModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    const repeatpwd = e.target.repeatpwd.value

    if (password !== repeatpwd) {
      showMessage({
        title: 'error',
        detail: 'register failed, The two passwords ar different',
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('username', e.target.username.value)
      formData.append('email', e.target.email.value)
      formData.append('password', e.target.password.value)
      await postUser(formData)

      const loginFormData = new FormData()
      loginFormData.append('username', e.target.username.value)
      loginFormData.append('password', e.target.password.value)
      await login(loginFormData)
      navToArticleList()()
      refreshPage()
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
      <RegisterForm handleSubmit={handleSubmit} />
    </main>
  )
}

export default Register
