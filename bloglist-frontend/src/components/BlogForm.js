import { useState } from 'react'
export default function BlogForm({CreateBlog}) {
    const [title, settitle] = useState("")
    const [author, setauthor] = useState("")
    const [formurl, setformurl] = useState("")
    const handleBlogForm = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: formurl
        }
        CreateBlog(blogObject)
        settitle("")
        setauthor("")
        setformurl("")
    }
    return (
        <div>
            <h2> Create New </h2>
            <form className="form" onSubmit={handleBlogForm}>
                <div>
                    Title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => settitle(target.value)}
                        placeholder = "Title"
                    />
                </div>
                <br />
                <div>
                    Author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setauthor(target.value)}
                        placeholder = "Author"
                    />
                </div>
                <br />
                <div>
                    URL
                    <input
                        type="text"
                        value={formurl}
                        name="url"
                        onChange={({ target }) => setformurl(target.value)}
                        placeholder = "URL"
                    />
                </div>
                <br />
                <button type="submit">Save</button>
            </form>

        </div>

    )
}