import React from 'react'
import { Outlet } from 'react-router-dom'

import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import TopNavBar from '../../components/common/TopNavBar'

const AppWrapper = () => {
  return (
    <Container>
      <TopNavBar />
      <Outlet />
    </Container>
  )
}

export default AppWrapper
