import React, { useState, useEffect } from 'react'
import PostNew from './components/PostNew'
import Notification from './components/Notification'
import loginService from './services/login'
import './index.css'

import { useDispatch } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import BlogsList from './components/BlogsList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const showNotification = (notification, error) => {
    dispatch(setNotification(notification, error))
  }


  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Invalid credentials', true)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='login-username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='login-password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )


  return (
    <div>
      <Notification/>
      {user === null ?
        loginForm():
        <div>
          <h2>blogs</h2>
          <span><p>{user.username} is logged in</p><button onClick={() => {
            window.localStorage.removeItem('loggedInUser')
            setUser(null)
          }
          }>Log Out</button> </span>
          <PostNew/>
          <BlogsList/>
        </div>
      }

    </div>
  )
}

export default App
