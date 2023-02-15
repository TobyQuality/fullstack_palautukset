import {useState, useEffect} from 'react'
import blogService from '../services/blogs'

const Blog =({blog, user, setBlogs}) => {
  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const [individualBlog, setIndividualBlog] = useState(blog)
  const [showButton, setShowButton] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenAuthorized =  { display: showButton ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    visible ? setButtonName('view') : setButtonName('hide')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const like = (event) => {
    event.preventDefault()
    const changedBlog = {...individualBlog, likes: (individualBlog.likes + 1)}
    blogService.update(changedBlog, individualBlog.id)
    setIndividualBlog(changedBlog)
    
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    ) 
  }

  const remove = (event) => {
    event.preventDefault()
    
    if (user.id === individualBlog.user.id) {
      if (window.confirm(`Remove blog ${individualBlog.title} by ${individualBlog.author}`)) {
        blogService.remove(individualBlog.id)

        setTimeout(() => {blogService.getAll().then(blogs =>
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )}, 500)
      }
    } else {
      window.alert(`You are not authorized to delete other peoples' blogs`)
    }
  }


  useEffect(() => {
    // in the first render it is important to note
    // that user.id and blog.user.id are null.
    // To avoid problems, one must add '?' in front of the
    // property name. When that is done, js will get the property
    // only if it is not null or undefined.
    // Huge thanks to Himanshu Singh, who gave the solution at
    // https://stackoverflow.com/questions/70234715/typeerror-cannot-read-properties-of-null-reading-user
    let usersId = user?.id
    let blogCreatorsId = blog?.user?.id
    if (usersId === blogCreatorsId) {
      setShowButton(true)
    }
  }, [])

  return(
  <div style={blogStyle}>
    {individualBlog.title} {individualBlog.author}<button onClick={toggleVisibility}>{buttonName}</button>
    <div style={showWhenVisible}>
      <div>{individualBlog.url}</div> 
      <div>{individualBlog.likes} <button onClick={like}>like</button></div>
      <div>{individualBlog.user?.username}</div>
      <div style={showWhenAuthorized}><button onClick={remove}>remove</button></div>
    </div>
  </div> 
  )
}

export default Blog