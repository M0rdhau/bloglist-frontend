import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  beforeEach(() => {
    const blog = {
      title: 'sample blog',
      author: 'sample author',
      likes: 0,
      url: 'some.url'
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('Blog only renders Author\'s name and Title', () => {

    const div = component.container.querySelector('.blogDiv')

    // console.log(prettyDOM(div))

    expect(div).toHaveTextContent(
      'sample blog'
    )
    expect(div).toHaveTextContent(
      'Author: sample author'
    )

    const togglable = component.container.querySelector('.togglable')

    expect(togglable).toHaveStyle('display: none')
  })

  test('Blog visibility is toggleable', () => {
    const button = component.getByText('view')
    const content = component.container.querySelector('.togglable')
    //click toggle once - show
    fireEvent.click(button)
    expect(content).not.toHaveStyle('display: none')
    //click toggle twice - hide
    fireEvent.click(button)
    expect(content).toHaveStyle('display: none')
  })
})