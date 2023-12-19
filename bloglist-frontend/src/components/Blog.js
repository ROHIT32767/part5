import React from "react"
import blogService from '../services/blogs'

function compareNumbers(a, b) {
  return -(a.likes - b.likes);
}

const Blog = (props) => {
  const [visible, setVisible] = React.useState(false)
  const LabelType = visible ? "Hide" : "View"
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  function ToggleLabel(event) {
    setVisible(!visible)
  }
  function increaseLikes(event) {
    const newObject = {
      ...props.blog,
      likes: props.blog.likes + 1
    }
    // console.log(props.blog._id)
    blogService.update(props.blog._id, newObject)
    const newarr1 = props.blogs.map(blog => blog._id === props.blog._id ? newObject : blog)
    newarr1.sort(compareNumbers)
    // console.log(newarr1)
    props.setBlogs(newarr1)
  }

  function removeBlog(event) {
    if (window.confirm(`Remove blog ${props.blog.title} by  ${props.blog.author}`)) {
      blogService.Delete(props.blog._id)
      const newarr = props.blogs.filter(blog => blog._id !== props.blog._id)
      newarr.sort(compareNumbers)
      props.setBlogs(newarr)
    }
  }

  // const blogRef = useRef()
  return (
    <div style={blogStyle}>
      {props.blog.title} by  {props.blog.author}
      <br />
      <button className="viewbutton" onClick={ToggleLabel}>{LabelType}</button>
      {visible && (
        <div>
          {props.blog.url}
          <br />
          <div>
            Likes {props.blog.likes}
            <br />
            <button  onClick={increaseLikes}>Upvote</button>
          </div>
          {props.blog.user.username}
          <br />
          {props.blog.user.username === props.user.username} <button onClick={removeBlog}>Remove</button>
          <br />
        </div>
      )}
    </div>
  )
}

export default Blog

      {/* <Togglable buttonLabel="View" Hidelabel="Hide" ref={blogRef}>
        {props.blog.url}
        <br />
        <div>
          Likes {props.blog.likes}
          <br />
          <button onClick={increaseLikes}>Upvote</button>
        </div>
        {props.blog.user.username}
        <br />
       {props.blog.user.username===props.user.username} <button onClick={removeBlog}>Remove</button>
       <br />
      </Togglable> */}