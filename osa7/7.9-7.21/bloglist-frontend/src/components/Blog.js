import {useState, useEffect} from 'react'
import { useMutation, useQueryClient, useQuery} from 'react-query'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { useLoginValue } from '../LoginContext'
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material'

const Blog =({blog}) => {
  const loginValue = useLoginValue()

  const [showButton, setShowButton] = useState(false)
  const showWhenAuthorized =  { display: showButton ? '' : 'none' }

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

  const postCommentMutation = useMutation(commentService.postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
    }
  })
  const postComment= (event) => {
    event.preventDefault()
    const newComment = {
      blogId: blog.id,
      comment: event.target.comment.value
    }
    postCommentMutation.mutate({...newComment})
    event.target.comment.value = ""
  }

  const result = useQuery('comments', commentService.getComments,
  { refetchOnWindowFocus: false },
  { retry: 1 }
)
const comments = result.isSuccess 
  ? [].concat(result.data).filter(comment => comment.blogId === blog?.id)
  : []

  useEffect(() => {
    if (loginValue.id === blog?.user?.id) {
      setShowButton(true)
    }
  }, [])

  return(
  <div id={blog.id} name="blog" value={blog} class="blog">
    <h2>{blog.title} {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a>
    <div>{blog.likes} 
      <Button variant="contained" size="small" color="primary" onClick={() => {handleVote(blog)}}>like
      </Button>
    </div>
    <p>added by {blog.user?.username}</p>
    <div style={showWhenAuthorized}>
    <Button variant="contained" 
      color="secondary" 
      type="submit" 
      onClick={remove}>
        remove
    </Button>
    </div>
    <h3>comments</h3>
    <form onSubmit={postComment}>
      <TextField label="comment" id="comment" name="comment"/>
      <div>
      <Button variant="contained" size="small" color="primary" type="submit">
        post comment
      </Button>
      </div>
    </form>
    <List>
      {comments?.map(comment =>
              <ListItem disablePadding key={comment.id}>
                <ListItemText primary={comment.comment}>
                </ListItemText>
              </ListItem>
      )}
    </List>
  </div>
  )
}

export default Blog