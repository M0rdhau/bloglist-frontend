import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogsReducer'


const PostNew = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(newBlog({
      title: title,
      author: author,
      url: url
    }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <Togglable buttonLabel='Post a new blog' >
      <div>
        <h3>Create new</h3>
        <form onSubmit={addBlog}>
          <div>
          Title
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(event) => {setTitle(event.target.value)}}
            />
          </div>
          <div>
          Author
            <input
              type='text'
              name='author'
              id='author'
              value={author}
              onChange={(event) => {setAuthor(event.target.value)}}
            />
          </div>
          <div>
          Url
            <input
              type='text'
              name='url'
              id='url'
              value={url}
              onChange={(event) => {setUrl(event.target.value)}}
            />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    </Togglable>
  )
}

PostNew.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default PostNew
