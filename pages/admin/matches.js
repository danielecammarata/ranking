import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'
import ModifyIcon from '@material-ui/icons/Create'

import { getMatchesList } from '../../lib/api/match'

import sendRequest from '../../lib/api/sendRequest'

import { convertDate } from '../../components/modifiers'
import PlayerChip from '../../components/elements/PlayerChip'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const styles = theme => ({
  root: {
    width: '95%',
    margin: theme.spacing.unit * 3,
    overflowX: 'scroll',
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

class AdminMatches extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      matches: props.matches
    }
  }

  static async getInitialProps() {
    const matches = await getMatchesList(0, 250)
    return {
      matches: matches.matches
    }
  }

  // modifyAndUpdateMatches = async (endPoint, matchId) => {
  //   await sendRequest(endPoint, { body: JSON.stringify( matchId )})
  //   const matches = await getMatchesList()
  //   this.setState({
  //     matches: matches.matches
  //   })
  // }

  // matchRank = async () => {
  //   const firstMatch = '5b83e204e6d7d1004ed108d7'
  //   await modifyAndUpdateMatches('/api/v1/admin/rank/update', { matchId: firstMatch })
  // }

  // onDelete = async (matchId) => {
  //   await modifyAndUpdateMatches('/api/v1/admin/match/delete', { matchId: matchId })
  // }

  // onUpdateFrom = async (matchId) => {
  //   await modifyAndUpdateMatches('/api/v1/admin/rank/update', { matchId: matchId })
  // }

  // onModify = async (matchId) => {

  // }

  matchRank = async () => {
    const firstMatch = '5b83e204e6d7d1004ed108d7'
    const data = await sendRequest('/api/v1/admin/rank/update', {body: JSON.stringify({ matchId: firstMatch })})
    const matches = await getMatchesList()
    this.setState({
      matches: matches.matches
    })
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
    const { classes } = this.props
    return (
      <div>
        <p>Matches List</p>
        <Button
          onClick={this.matchRank}
        >
          match calc
        </Button>
        <h5>Users</h5>
        <Paper
          className={classes.root}
        >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Actions</CustomTableCell>
              <CustomTableCell>Date</CustomTableCell>
              <CustomTableCell>Home</CustomTableCell>
              <CustomTableCell></CustomTableCell>
              <CustomTableCell>Away</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.matches.map(match => {
                return (
                  <TableRow
                    key={match.slug}
                  >
                    <TableCell>
                      <DeleteIcon
                        onClick={this.onDelete.bind(this, match._id)}
                      />
                      <UpdateIcon
                        onClick={this.onUpdateFrom.bind(this, match._id)}
                      />
                      {/* <ModifyIcon
                        onClick={this.onModify.bind(this, match._id)}
                      /> */}
                    </TableCell>
                    <TableCell>{convertDate(match.createdAt)}</TableCell>
                    <TableCell>
                      <PlayerChip
                        avatarUrl={match.teamHome.defender.avatarUrl}
                        name={match.teamHome.defender.name}
                        playerSide="left"
                      />
                      <PlayerChip
                        avatarUrl={match.teamHome.striker.avatarUrl}
                        name={match.teamHome.striker.name}
                        playerSide="left"
                      />
                    </TableCell>
                    <TableCell>{match.teamHome.score}</TableCell>
                    <TableCell>
                      <PlayerChip
                        avatarUrl={match.teamAway.defender.avatarUrl}
                        name={match.teamHome.defender.name}
                        playerSide="left"
                      />
                      <PlayerChip
                        avatarUrl={match.teamAway.striker.avatarUrl}
                        name={match.teamHome.striker.name}
                        playerSide="left"
                      />
                    </TableCell>
                    <TableCell>{match.teamAway.score}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AdminMatches)
