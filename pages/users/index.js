import Link from 'next/link'
import CountUp from 'react-countup'

import Layout from '../../components/Layout.js'
import { getUsersList, deleteUser } from '../../lib/api/users'
import { styleH1 } from '../../lib/SharedStyles'

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'

import {
  PlayerStatsTable,
  RankingActionsHeader
} from '../../components/elements/Ranking'

let countInactive = 0

const styles = theme => ({
  hideUser: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '180px',
  },
  formLabel: {
    paddingTop: '18px',
    width:'100%',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 200px)'
    }
  },
  formSelect: {
    maxWidth: '200px',
    '& > div > div': {
      padding: '8px 32px 8px 10px'
    }
  },
  user: {
    padding: '14px 0px',
    '&[data-challenge="challenge"]': {
      backgroundColor: '#eaeaea',
      boxShadow: '1px 1px 4px #bbb',
      padding: '14px 20px'
    }
  }
})

class IndexUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || [],
      userDeleted: false,
      hideInactives: true,
      selectOpen: false,
      sortingValue: 'points'
    }
  }

  static async getInitialProps() {
    const users = await getUsersList()
    return {
      users: users
    }
  }

  async componentWillMount () {
    this.resetInactiveCounter()
    try {
      this.props.users.map((user, index) => (
        user.active = this.isActiveUser(user, 15)
      ))
    } catch (err) {
      console.log(err)
    }
  }

  async removeUser (user, e) {
    e.preventDefault()
    const removedUser = await deleteUser(user._id)
    const localUserList = this.state.users.filter( el => el._id !== removedUser._id )
    this.setState({ users: localUserList, userDeleted: true })
  }

  handleChange = event => {
    this.resetInactiveCounter()
    this.setState({ [event.target.name]: event.target.value })
    this.changeSorting(event.target.value)
  }

  changeSorting(newSorting) {
    this.props.users.sort((a,b) =>{
      a.goals = a.stats.match_goals_made_as_striker+a.stats.match_goals_made_as_defender
      a.conceded = a.stats.match_goals_conceded_as_defender
      a.played = a.stats.match_played
      b.goals = b.stats.match_goals_made_as_striker+b.stats.match_goals_made_as_defender
      b.conceded = b.stats.match_goals_conceded_as_defender
      b.played = b.stats.match_played

      return b[newSorting] - a[newSorting]
    })
  }

  handleClose = () => {
    this.setState({ selectOpen: false });
    this.resetInactiveCounter()
  }

  handleOpen = () => {
    this.setState({ selectOpen: true });
    this.resetInactiveCounter()
  }

  isActiveUser (user, days) {
    const limit = days * (1000 * 60 * 60 * 24) // convert to ms
    const today = new Date()
    let lastMatch = user.stats.last_match
    if(today.getTime() - Date.parse(lastMatch) < limit) {
      return true
    }
    return false
  }

  handleShowInactive = () => {
    this.setState(state => ({
      hideInactives: !this.state.hideInactives
    }))
    this.resetInactiveCounter()
  }

  resetInactiveCounter() {
    countInactive = 0
  }

  render() {
    return (
      <Layout>
        <h1 style={styleH1}>Ranking</h1>
        <RankingActionsHeader
          classes={this.props.classes}
          onShowInactive={this.handleShowInactive}
          isSortOpen={this.state.selectOpen}
          onSortOpen={this.handleOpen}
          onSortClose={this.handleClose}
          onSortChange={this.handleChange}
          sortingValue={this.state.sortingValue}
        />
        <Divider />
        <List>
          {this.props.users && this.props.users.map((user, index) => (
            <Link
              key={`${user.slug}-${index}`}
              as={`/users/${user.slug}`}
              href={`/users/update/?slug=${user.slug}`}
            >
              <ListItem
                key={user.slug}
                style={{overflow: 'hidden'}}
                divider
                className={(!this.state.hideInactives || user.active) ? ('showUser ' + this.props.classes.user) : this.props.classes.hideUser}
                data-challenge={(user.role == 'challenge') ? 'challenge' : 'regular'}
              >
                <Typography
                  variant="h3"
                  style={{ padding: '0px 6px', fontSize: 22, minWidth: '36px' }}
                >
                  {(!this.state.hideInactives || user.active) ? ++countInactive : index+1}
                </Typography>
                <ListItemAvatar>
                  <Avatar
                    alt={user.name}
                    src={user.avatarUrl}
                    style={{ height: 80, margin: '0px 10px', width: 80 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{minWidth: '100px', padding: '0px 6px'}}
                  primary={user.name}
                  primaryTypographyProps={{
                    variant: "h3",
                    style: { fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis' }
                  }}
                  secondary={<CountUp start={1200} end={user[this.state.sortingValue]} duration={3}/>}
                  secondaryTypographyProps={{
                    style: { fontSize: 18, color: lightBlue[500] }
                  }}
                />
                <PlayerStatsTable
                  points={user.points}
                  matchPlayed={user.stats.match_played}
                  goalsAsDefender={user.stats.match_goals_made_as_defender}
                  goalsAsStriker={user.stats.match_goals_made_as_striker}
                  goalsConceded={user.stats.match_goals_conceded_as_defender}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(IndexUser)
