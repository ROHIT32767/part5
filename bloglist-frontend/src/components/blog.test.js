import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe("Blog Testing", () => {
    let setBlogs = jest.fn()
    const user = {
        username: "Usertests",
        name: "Usertests"
    }
    test('Blog renders title and author', () => {
        const newblog = {
            title: "Testing Title",
            author: "Testing author",
            url: "Testing url",
            likes: 7,
            user: {
                username: "Usertests",
                name: "Usertests"
            }
        }
        const component = render(<Blog blog={newblog} user={user} />)
        expect(component.container).toHaveTextContent("Testing Title by Testing author")
    })
    test('Blog renders title,author,url,likes when View is Clicked', async() => {
        const newblog = {
            title: "Testing Title",
            author: "Testing author",
            url: "Testing url",
            likes: 7,
            user: {
                username: "Usertests",
                name: "Usertests"
            }
        }
        const component = render(<Blog blog={newblog} user={user} />)
        const User = userEvent.setup()
        const button = component.getByText("View")
        await User.click(button)
        expect(component.container).toHaveTextContent("Testing Title by Testing author")
        expect(component.container).toHaveTextContent("Testing url")
        expect(component.container).toHaveTextContent("7")
    })
    test('Ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', async() => {
        const newblog = {
            title: "Testing Title",
            author: "Testing author",
            url: "Testing url",
            likes: 7,
            user: {
                username: "Usertests",
                name: "Usertests"
            }
        }
        const mockHandler = jest.fn()
        const component = render(<Blog blog={newblog} user={user} blogs={[newblog]} setBlogs={mockHandler} />)
        const User = userEvent.setup()
        const button = component.getByText("View")
        await User.click(button)
        const User1 = userEvent.setup()
        const LikeButton = component.getByText("Upvote")
        await User1.dblClick(LikeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
    


})


