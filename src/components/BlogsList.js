import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogsReducer'


const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  return (
    <ul>
      {
        blogs.map(blog =>
          <Blog
            key = {blog.id}
            blog = {blog}
            onLike={() => dispatch(like(blog))}
            onDelete={() => dispatch(deleteBlog(blog.id))}
          />
        )
      }
    </ul>
  )

}

export default BlogsList
