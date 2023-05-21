const BlogsForm = ({
  createNewBlog,
  blog,
  setBlog,
}) => (
  <div>
    <h2>create new blog</h2>
    <form onSubmit={createNewBlog}>
      <div>
          title:
        <input
          type="text"
          id="title"
          value={blog.title}
          name="title"
          onChange={ ({ target }) => setBlog({ ...blog, title: target.value }) }
        />
      </div>
      <div>
          author:
        <input
          type="text"
          id="author"
          value={blog.author}
          name="author"
          onChange={ ({ target }) => setBlog({ ...blog, author: target.value }) }
        />
      </div>
      <div>
          url:
        <input
          type="text"
          id="url"
          value={blog.url}
          name="url"
          onChange={ ({ target }) => setBlog({ ...blog, url: target.value }) }
        />
      </div>
      <button type="submit" id="create">create</button>
    </form>
  </div>
)

export default BlogsForm