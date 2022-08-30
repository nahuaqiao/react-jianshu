import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ArticleAddOrEdit from '../Articles/ArticleAddOrEdit'
import ArticleDetail from '../Articles/ArticleDetail'
import AppWapper from '../AppWrapper'
import ArticleList from '../Articles/ArticleList'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import NotFound from '../NotFound'

const AppRouter = () => {
  return (
    <Router>
      <React.Suspense>
        <Routes>
          <Route path='/' element={<AppWapper />}>
            <Route path='/' element={<ArticleList />} />
            <Route path='users/login' element={<Login />} />
            <Route path='users/register' element={<Register />} />

            <Route path='/articles' element={<ArticleList />} />
            <Route
              path='/articles/post'
              element={<ArticleAddOrEdit isAddPattern={true} />}
            />
            <Route
              path='/articles/detail/:articleId'
              element={<ArticleDetail />}
            />
            <Route
              path='/articles/edit/:articleId'
              element={<ArticleAddOrEdit isAddPattern={false} />}
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </Router>
  )
}

export default AppRouter
