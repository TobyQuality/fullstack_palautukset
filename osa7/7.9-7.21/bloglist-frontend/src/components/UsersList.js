import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const UsersList = ({users}) => {

    return (
    <div>
    <h2>Users</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableCell>
          Username
        </TableCell>
        <TableCell>
          Blogs created
        </TableCell>
      </TableHead>
      <TableBody>
          {
          users.map(u =>
            <TableRow key={u.id}>
              <TableCell>
              <Link to={`/users/${u.id}`}>{u.username}</Link>
              </TableCell>
              <TableCell>
              {u.blogs.length}
              </TableCell>
            </TableRow>)
          }
      </TableBody>
      </Table>
      </TableContainer>
    </div>
    )
}

export default UsersList