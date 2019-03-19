import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar
}from '@material-ui/core'

import { AdminHeader } from '../../components/blocks/Admin'
import { getUsersList } from '../../lib/api/users'

const styles = theme => ({
  root: {
    width: '95%',
    margin: theme.spacing.unit * 3,
    overflowX: 'scroll',
  },
  grow: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})

const AdminPlayers = ({
  users,
  classes
}) =>
  <div>
    <AdminHeader>

    </AdminHeader>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Auth</TableCell>
            <TableCell>Pos</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Matches Played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((user, index) =>
              <TableRow key={user.slug}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar src={user.avatarUrl}/>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.stats.match_played}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Paper>
  </div>

AdminPlayers.getInitialProps = async () => {
  const users = await getUsersList()
  return {
    users: users
  }
}

export default withStyles(styles)(AdminPlayers)
