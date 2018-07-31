import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'

import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'

import Router from 'next/router'

import Layout from '../../components/Layout.js'
import PlayerDialogSelect from '../../components/PlayerDialogSelect.js'
import getRootUrl from '../../lib/api/getRootUrl'
import { getUsersList } from '../../lib/api/users'
import { addNewMatch } from '../../lib/api/match'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

import MatchPlayerSelection from '../../components/MatchPlayerSelection'
import MatchPlayerHeader from '../../components/MatchPlayerHeader'

class AddMatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      players: [],
      matchAdded: false,
      teamHome: {
        defender: {
          showNames: false,
          selected: false,
          avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
          name: ''
        },
        striker: {
          showNames: false,
          selected: false,
          avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
          name: ''
        },
        score: 0
      },
      teamAway: {
        defender: {
          showNames: false,
          selected: false,
          avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
          name: ''
        },
        striker: {
          showNames: false,
          selected: false,
          avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
          name: ''
        },
        score: 0
      },

      enableScore: false,
      homeGoals: NaN,
      homeGoalsDefender: NaN,
      homeGoalsStriker: NaN,
      awayGoals: NaN,
      awayGoalsDefender: NaN,
      awayGoalsStriker: NaN,
      homeDefender: {},
      homeDefenderSelected: false,
      homeStriker: {},
      homeStrikerSelected: false,
      awayDefender: {},
      awayDefenderSelected: false,
      awayStriker: {},
      awayStrikerSelected: false,
      badges: []
    }

  }

  handleScoreChange = name => event => {
    const teamObj = Object.assign({}, this.state[name], {score: event.target.value})
    this.setState({
      [name]: teamObj
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const match = await addNewMatch({
      teamHome: this.state.teamHome,
      teamAway: this.state.teamAway,
      badges: []
    })

    this.setState({matchAdded: true})
    Router.push('/matches')
  }

  onPlayerSelection = (player, selector) => {
    console.log(player)
    console.log(selector)
    this.setState({
      [selector]: true,
      [selector.replace('Selected', '')]: player
    })
  }

  onScoreChange = params => {
    const {value, selector} = params

    this.setState({[selector]: value})
  }

  onSave = async () => {
    const badges = []
    if (this.state.homeGoals === 0 || this.state.awayGoals === 0) {
      badges.push('cappotto')
    }
    const match = {
      teamHome: {
        defender: {
          _id: this.state.homeDefender._id
        },
        striker: {
          _id: this.state.homeStriker._id
        },
        score: this.state.homeGoals
      },
      teamAway: {
        defender: {
          _id: this.state.awayDefender._id
        },
        striker: {
          _id: this.state.awayStriker._id
        },
        score: this.state.awayGoals
      },
      badges: badges
    }
    await addNewMatch(match)

    Router.push('/matches')
  }

  render () {
    return (
      <Layout>
        <GridList
          cols={2}
        >
          <MatchPlayerHeader
            enableScore={this.state.homeDefenderSelected && this.state.homeStrikerSelected}
            onScoreChange={this.onScoreChange}
            selector={'homeGoals'}
            teamLabel={'Team Home'}
          />
          <MatchPlayerSelection
            selector={'homeDefenderSelected'}
            team={'teamHome'}
            role={'defender'}
            onPlayerSelection={this.onPlayerSelection}
          />
          <MatchPlayerSelection
            selector={'homeStrikerSelected'}
            team={'teamHome'}
            role={'striker'}
            onPlayerSelection={this.onPlayerSelection}
          />
          <MatchPlayerHeader
            enableScore={this.state.awayDefenderSelected && this.state.awayStrikerSelected}
            onScoreChange={this.onScoreChange}
            selector={'awayGoals'}
            teamLabel={'Team Away'}
          />
          <MatchPlayerSelection
            selector={'awayDefenderSelected'}
            team={'teamAway'}
            role={'defender'}
            onPlayerSelection={this.onPlayerSelection}
          />
          <MatchPlayerSelection
            selector={'awayStrikerSelected'}
            team={'teamAway'}
            role={'striker'}
            onPlayerSelection={this.onPlayerSelection}
          />
          {/* { this.state.homeDefenderSelected && this.state.homeStrikerSelected && this.state.awayDefenderSelected && this.state.awayStrikerSelected && */}
          {((this.state.homeGoals > 5 && (this.state.homeGoals - this.state.awayGoals) > 1) ||
            (this.state.awayGoals > 5 && (this.state.awayGoals - this.state.homeGoals) > 1)) &&
          <GridListTile cols={2} style={{height: 'auto', width: '100%', textAlign: 'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSave}
            >
              Save
            </Button>
          </GridListTile>
          }
        </GridList>
      </Layout>
    )
  }
}

export default AddMatch
