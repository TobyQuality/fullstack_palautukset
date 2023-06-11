import { useMutation, useQueryClient} from 'react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'
import { Button, TextField } from '@mui/material'

const BlogsForm = () => {
const dispatch = useNotificationDispatch()

const queryClient = useQueryClient()

const newBlogMutation = useMutation(blogService.create, {
  onSuccess: (response) => {
    const previousBlogs = queryClient.getQueryData('blogs')
    queryClient.setQueryData('blogs', previousBlogs.concat(response))
  }
})
const setBlogs = (newBlog) => {
  newBlogMutation.mutate({ ...newBlog })
}
const createNewBlog = async (event) => {
  event.preventDefault()
  try {
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    setBlogs(newBlog)
      event.target.title.value = ""
      event.target.author.value = ""
      event.target.url.value = ""
    dispatch({ type: 'CREATE_SUCCESS', payload: { newBlog } })
    setTimeout(() => {
      dispatch({ type: '' })
    }, 5000)
  } catch (exception) {
    dispatch({ type: 'CREATE_FAIL' })
    setTimeout(() => {
      dispatch({ type: '' })
    }, 5000)
  }
}

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={createNewBlog}>
      <div>
        <TextField label="title" id="title" name="title"/>
      </div>
      <div>
        <TextField label="author" id="author" name="author"/>
      </div>
      <div>
        <TextField label="url" id="url" name="url"/>
      </div>
      <Button variant="contained" color="primary" type="submit">
          Create
      </Button>
      </form>
    </div>
  )
} 

export default BlogsForm