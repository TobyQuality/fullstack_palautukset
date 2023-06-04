import axios from 'axios'
const postUrl = 'http://localhost:3003/api/blogs/:id/comments'
const getUrl = 'http://localhost:3003/api/blogs/comments'

const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

const getComments = () => {
    const request = axios.get(getUrl)
    return request.then(response => response.data)
  }

  const postComment = async newObject => {
  const token = getToken();
  let config = { headers: null }

  if (token) {
    config.headers = { Authorization: `bearer ${token}`}
  }

    const response = await axios.post(postUrl, newObject, config)
    return response.data
  }

export default { getComments, postComment }