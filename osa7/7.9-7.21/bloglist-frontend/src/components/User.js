import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const User = ({user}) => {
    if (!user) {    return null  }
    return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs:</h4>
    <List>
      {user.blogs.map(blog => 
              <ListItem disablePadding key={blog.id}>
              <ListItemText primary={blog.title}>
              </ListItemText>
            </ListItem>
      )}
    </List>
    </div>
    )
  }

  export default User

/*
      <div>
        <h2>{user.username}</h2>
        <h4>Added blogs:</h4>
        <ul>
          {user.blogs.map(blog => 
            <li key={blog.id}>{blog.title}</li>) }
        </ul>
      </div>
*/