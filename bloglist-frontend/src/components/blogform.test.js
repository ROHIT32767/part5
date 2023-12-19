import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const CreateBlog = jest.fn()
    const component = render(<BlogForm CreateBlog={CreateBlog} />)
    const input1 = component.getByPlaceholderText('Title')
    const form = component.container.querySelector('form')
    const input2 = component.getByPlaceholderText('Author')
    const input3 = component.getByPlaceholderText('URL')
    const sendButton = component.getByText('Save')
    await userEvent.type(input1, 'testing input 1 of a form...')
    await userEvent.type(input2, 'testing input 2 of a form...')
    await userEvent.type(input3, 'testing input 3 of a form...')
    await userEvent.click(sendButton)
    expect(CreateBlog.mock.calls).toHaveLength(1)
    expect(CreateBlog.mock.calls[0][0].title).toBe('testing input 1 of a form...')
    expect(CreateBlog.mock.calls[0][0].author).toBe('testing input 2 of a form...')
    expect(CreateBlog.mock.calls[0][0].url).toBe('testing input 3 of a form...')
})