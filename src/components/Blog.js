import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, onLike, onDelete }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      <h3>{blog.title} </h3>
      <p>Author: <strong>{blog.author}</strong></p>
      <Togglable buttonLabel='view'>
        <span><p className='howManyLikes'>Likes: {blog.likes}</p> <button className='likeButton' onClick={onLike}>Like</button></span>
        <p>{blog.url}</p>
        <button onClick={onDelete}>Delete</button>
      </Togglable>
    </div>
  )
}

export default Blog
