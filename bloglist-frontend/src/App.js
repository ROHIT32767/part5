import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm"
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
function compareNumbers(a, b) {
  return -(a.likes - b.likes);
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [user, setuser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs.sort(compareNumbers))
      return setBlogs(blogs.sort(compareNumbers))
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div>
        <div className="error">
          {message}
        </div>
      </div>
    )
  }

  const handleLogin = async (event) => { 
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setuser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setusername('')
      setpassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const CreateBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedblog => {
      setBlogs(blogs.concat(returnedblog))
      setErrorMessage(`a new blog ${returnedblog.title} by ${returnedblog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const Logout = (event) => {
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    setuser(null)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      {user == null ?
        <Togglable buttonLabel="Login" Hidelabel="Cancel">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setusername(target.value)}
            handlePasswordChange={({ target }) => setpassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <div>
            <h3> {user.username} Logged In</h3>
            <button onClick={Logout} > Logout</button>
          </div>
          <br />
          <Togglable buttonLabel="Create New Blog" Hidelabel="Cancel" ref={blogFormRef}>
            <BlogForm CreateBlog={CreateBlog} />
          </Togglable>
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blogs={blogs} blog={blog} setBlogs={setBlogs} user={user}/>
          )}
        </div>
      }


    </div>
  )
}

export default App
