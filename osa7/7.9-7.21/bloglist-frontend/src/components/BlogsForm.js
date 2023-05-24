import { useMutation, useQueryClient} from 'react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

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
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {blogService.getAll().then(blogs =>
      blogs.sort((a, b) => b.likes - a.likes)
    )}, 500)
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
            title:
          <input
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div>
            author:
          <input
            type="text"
            id="author"
            name="author"
          />
        </div>
        <div>
            url:
          <input
            type="text"
            id="url"
            name="url"
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
} 

export default BlogsForm