import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      return state.map(a => a.id !== action.blog.id ? a : action.blog)
    case 'NEW_BLOG':
      return [...state, action.blog]
    case 'DELETE_BLOG':
      return state.filter(blog => action.id !== blog.id)
    case 'BLOGS_INIT':
      return action.data
    default:
      return state
  }
}

export const like = (blog) => {
  return async dispatch => {
    const blogToUpdate = { ...blog }
    blogToUpdate.likes = blogToUpdate.likes + 1
    const updatedBlog = await blogsService.update(blogToUpdate)
    dispatch({
      type: 'LIKE',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogsService.deleteBlog(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      id: blogId
    })
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    const blogToAdd = await blogsService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      blog: blogToAdd
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogsService.getAll()
    dispatch({
      type: 'BLOGS_INIT',
      data: allBlogs
    })
  }
}

export default blogsReducer
