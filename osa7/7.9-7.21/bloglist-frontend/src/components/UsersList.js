import { Link } from "react-router-dom"

const UsersList = ({users}) => {

    return (
    <div>
    <h2>Users</h2>
    <table>
      <tbody>
      <tr>
        <th></th>
        <th><strong>blogs created</strong></th>
      </tr>
        {users.map(u =>
          <tr key={u.id}>
            <Link to={`/users/${u.id}`}>
              <td>{u.username}</td><td>{u.blogs.length}</td>
            </Link>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    )
}

export default UsersList