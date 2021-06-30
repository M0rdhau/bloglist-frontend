import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostNew from './PostNew'

test('<PostNew /> calls the event handler with right parameters', () => {
  const createBlog = jest.fn()

  const component = render(
    <PostNew createBlog={createBlog}/>
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'sample author' }
  })
  fireEvent.change(title, {
    target: { value: 'sample title' }
  })
  fireEvent.change(url, {
    target: { value: 'sample url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('sample author')
  expect(createBlog.mock.calls[0][0].title).toBe('sample title')
  expect(createBlog.mock.calls[0][0].url).toBe('sample url')
})