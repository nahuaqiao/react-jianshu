import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from '../../../apis/UsersApi'

const LoginForm = ({ handleSubmit }) => {
  const navToRegister = (e) => {
    e.preventDefault()
    // nav to register page.
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          type='password'
          placeholder='password'
          required={true}
        />
      </Form.Group>

      <Form.Group className='d-grid gap-2 mb-3'>
        <Button type='submit' variant='primary' size='lg'>
          {`Login`}
        </Button>
      </Form.Group>

      <Button onClick={navToRegister} variant='link' size='lg'>
        {`Register`}
      </Button>
    </Form>
  )
}

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', e.target.username.value)
    formData.append('password', e.target.password.value)
    await login(formData)
  }
  return (
    <main>
      <LoginForm handleSubmit={handleSubmit} />
    </main>
  )
}

export default Login
