import Button from '@material-ui/core/Button'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'

import { getMatchesList } from '../../lib/api/match'

import sendRequest from '../../lib/api/sendRequest'

class AdminMatches extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      matches: props.matches
    }
  }

  static async getInitialProps() {
    const matches = await getMatchesList(0, 200)
    return {
      matches: matches.matches
    }
  }

  matchRank = () => {
    sendRequest('/api/v1/admin/rank/update/5b857b08bc7a3f00e81bbf53')
  }

  onDelete = async (matchId) => {
    const data = await sendRequest('/api/v1/admin/match/delete', {body: JSON.stringify({ matchId })})
    const matches = await getMatchesList()
    this.setState({
      matches: matches.matches
    })
  }

  onUpdateFrom = async (matchId) => {
    const data = await sendRequest('/api/v1/admin/rank/update', {body: JSON.stringify({ matchId })})
    const matches = await getMatchesList()
    this.setState({
      matches: matches.matches
    })
  }

  render () {
    return (
      <div>
        <p>Matches List</p>
        <Button
          onClick={this.matchRank}
        >
          match calc
        </Button>
        <h5>Users</h5>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Home Defender</TableCell>
              <TableCell>Home Striker</TableCell>
              <TableCell>Home Score</TableCell>
              <TableCell>Away Defender</TableCell>
              <TableCell>Away Striker</TableCell>
              <TableCell>Away Score</TableCell>
              <TableCell>Diff</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.matches.map(match => {
                return (
                  <TableRow key={match.slug}>
                    <TableCell>
                      <DeleteIcon
                        onClick={this.onDelete.bind(this, match._id)}
                      />
                      <UpdateIcon
                        onClick={this.onUpdateFrom.bind(this, match._id)}
                      />
                    </TableCell>
                    <TableCell>{match._id}</TableCell>
                    <TableCell>{match.createdAt}</TableCell>
                    <TableCell>{match.teamHome.defender.name}</TableCell>
                    <TableCell>{match.teamHome.striker.name}</TableCell>
                    <TableCell>{match.teamHome.score}</TableCell>
                    <TableCell>{match.teamAway.defender.name}</TableCell>
                    <TableCell>{match.teamAway.striker.name}</TableCell>
                    <TableCell>{match.teamAway.score}</TableCell>
                    <TableCell>{match.difference}</TableCell>
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

export default AdminMatches
