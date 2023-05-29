import {useState, useEffect} from 'react'
import { useMutation, useQueryClient} from 'react-query'
import blogService from '../services/blogs'
import { useLoginValue } from '../LoginContext'

const Blog =({blog}) => {
  const loginValue = useLoginValue()

  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')
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

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const handleVote = (blog) => {
    updateBlogMutation.mutate({ ...blog, "likes": blog.likes + 1 })
  }

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const handleRemove = (id) => {
    removeBlogMutation.mutate( id )
  }
  const remove = (event) => {
    event.preventDefault()
    if (loginValue.id === blog.user.id) {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        handleRemove(blog.id)
      }
    } else {
      window.alert(`You are not authorized to delete other peoples' blogs`)
    }
  }

  useEffect(() => {
    if (loginValue.id === blog?.user?.id) {
      setShowButton(true)
    }
  }, [])

  return(
  <div style={blogStyle} id={blog.title} name="blog" value={blog} class="blog">
    <div>{blog.title}</div> 
    <div>{blog.author}</div>
    <div><button onClick={toggleVisibility}>{buttonName}</button></div>
    <div style={showWhenVisible}>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => {handleVote(blog)}}>like</button></div>
      <div>{blog.user?.username}</div>
      <div style={showWhenAuthorized}>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  </div> 
  )
}

export default Blog