import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'

test('renders title, likes and url are not shown', () => {
    const blog = {
      title: 'testing the visibility of title',
      author: 'anonymous',
      likes : 100,
      url: 'yoyo.com'
    }

    const user = {
      username: 'James'
    }

    mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} user={user} setBlogs={() => "hello"} onClick={mockHandler}/>)

    const title = container.querySelector('#title')
    expect(title).toHaveTextContent('testing the visibility of title')

    const div = container.querySelector('#visibility')
    expect(div).toHaveStyle('display: none')

})

test('renders other blog items after pressing view button', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes : 100,
    url: 'yoyo.com',

  }
  const userId = {
    id: '63b2f8c760b9baff24d73439'
  }

  const component= render(<Blog blog={blog} user={userId} setBlogs={() => 'hello'} />)

  const user = userEvent.setup()
  const button = component.getByText('view')
  await user.click(button)

  expect(component.getByText('hide')).toBeInTheDocument()
  expect(component.getByText('yoyo.com')).toBeInTheDocument()

})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://blogurl.com',
    likes: 0,
    user: {
      username: 'testuser',
      name: 'Test User',
      id: '6071ee5a68d32549e47181c7',
    },
    id: '6071ee5a68d32549e47181c8',
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} mockHandler={mockHandler}/>)
  
  const user = userEvent.setup()
  const button = component.getByText('like')
  button.onClick = component.onClick
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('BlogsForm component uses the callback function given as props with correct information, when creating a new blog', async () => {

  const user = userEvent.setup()
  const createNewBlog = jest.fn()
  const setBlog = jest.fn()
  const blog = {title: '', author: '', url: ''}

  render(<BlogsForm createNewBlog={createNewBlog} blog={blog} setBlog={setBlog}/>)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'testtitle')
  await user.type(inputs[1], 'testauthor')
  await user.type(inputs[2], 'testurl')

  expect(inputs[0]).toHaveValue('testtitle')
  expect(inputs[1]).toHaveValue('testauthor')
  expect(inputs[2]).toHaveValue('testtitle')
  
  await user.click(createButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)

})