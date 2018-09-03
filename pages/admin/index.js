import Button from '@material-ui/core/Button'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { getUsersList } from '../../lib/api/users'

import sendRequest from '../../lib/api/sendRequest'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || []
    }
  }

  async componentDidMount() {
    try {
      const data = await getUsersList()
      this.setState({ users: data })
    } catch (err) {
      console.log(err)
    }
  }

  calc = () => {
    sendRequest('/api/v1/admin/stats/users/update')
  }

  matchRank = () => {
    sendRequest('/api/v1/admin/rank/update/5b8d1a0fbfda2800383ed2ac')
  }

  render () {
    return (
      <div>
        <p>This is the admin page</p>
        <Button
          onClick={this.matchRank}
        >
          match calc
        </Button>
        <Button
          onClick={this.calc}
        >
          calc
        </Button>
        <h5>Users</h5>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>win_streak</TableCell>
              <TableCell>max_win_streak</TableCell>
              <TableCell>points_trend</TableCell>
              <TableCell>points_max</TableCell>
              <TableCell>points_min</TableCell>
              <TableCell>match_played</TableCell>
              <TableCell>match_win</TableCell>
              <TableCell>match_crawl</TableCell>
              <TableCell>match_crawled</TableCell>
              <TableCell>match_as_defender</TableCell>
              <TableCell>match_as_striker</TableCell>
              <TableCell>win_as_defender</TableCell>
              <TableCell>win_as_striker</TableCell>
              <TableCell>match_goals_made</TableCell>
              <TableCell>match_goals_conceded</TableCell>
              <TableCell>match_goals_made_as_defender</TableCell>
              <TableCell>match_goals_conceded_as_defender</TableCell>
              <TableCell>last_matches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.users.map(user => {
                return (
                  <TableRow key={user.slug}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.points}</TableCell>
                    <TableCell>{user.win_streak}</TableCell>
                    <TableCell>{user.max_win_streak}</TableCell>
                    <TableCell>{user.points_trend}</TableCell>
                    <TableCell>{user.points_max}</TableCell>
                    <TableCell>{user.points_min}</TableCell>
                    <TableCell>{user.match_played}</TableCell>
                    <TableCell>{user.match_win}</TableCell>
                    <TableCell>{user.match_crawl}</TableCell>
                    <TableCell>{user.match_crawled}</TableCell>
                    <TableCell>{user.match_as_defender}</TableCell>
                    <TableCell>{user.match_as_striker}</TableCell>
                    <TableCell>{user.win_as_defender}</TableCell>
                    <TableCell>{user.win_as_striker}</TableCell>
                    <TableCell>{user.match_goals_made}</TableCell>
                    <TableCell>{user.match_goals_conceded}</TableCell>
                    <TableCell>{user.match_goals_made_as_defender}</TableCell>
                    <TableCell>{user.match_goals_conceded_as_defender}</TableCell>
                    <TableCell>{user.last_matches ? user.last_matches.join(', ') : ''}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Admin
