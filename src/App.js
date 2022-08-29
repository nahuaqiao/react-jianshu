import { getUserIdFromToken } from './apis/Token'
import './App.scss'

// import ArticleList from './pages/Articles/ArticleList'
import TopNavBar from './components/common/TopNavBar'

function App() {
  return (
    <div className='App'>
      <TopNavBar />
      {/* <ArticleList /> */}
    </div>
  )
}

export default App
