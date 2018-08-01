import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import React from 'react'
import Router from 'next/router'
import getRootUrl from '../../lib/api/getRootUrl'
import Layout from '../../components/Layout.js'
import MatchPlayerHeader from '../../components/MatchPlayerHeader'
import MatchPlayerSelection from '../../components/MatchPlayerSelection'
import PinnedSubheaderList from '../../components/PinnedSubheaderList'
import { addNewMatch } from '../../lib/api/match'
import { getUsersList } from '../../lib/api/users'
import { styleForm } from '../../lib/SharedStyles'

const defaultPlayer = {
  _id: 'default',
  avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
  name: '',
  selected: false,
  showNames: false
}

class AddMatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSelection: null,
      awayDefender: defaultPlayer,
      awayDefenderSelected: false,
      awayGoals: NaN,
      awayGoalsDefender: NaN,
      awayGoalsStriker: NaN,
      awayStriker: defaultPlayer,
      awayStrikerSelected: false,
      badges: [],
      enableScore: false,
      homeDefender: defaultPlayer,
      homeDefenderSelected: false,
      homeGoals: NaN,
      homeGoalsDefender: NaN,
      homeGoalsStriker: NaN,
      homeStriker: defaultPlayer,
      homeStrikerSelected: false,
      matchAdded: false,
      search: '',
      showSelectionList: false
    }

    this.onSelectPlayer = this.onSelectPlayer.bind(this)
  }

  async componentDidMount () {
    console.log('mount')

    try {
      const players = await getUsersList()
      this.setState({playersList: players})
    } catch (err) {
      console.log(err)
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

  onSelectPlayer = player => {
    this.setState(
      {
        [`${this.state.activeSelection}`]: player,
        activeSelection: null,
        showSelectionList: false
      })
  }

  showPlayersSelect = pointer => () => {
    this.setState({
      activeSelection: pointer,
      showSelectionList: true
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
          _id: this.state.homeDefender._id,
          points: this.state.homeDefender.points
        },
        striker: {
          _id: this.state.homeStriker._id,
          points: this.state.homeStriker.points
        },
        score: this.state.homeGoals
      },
      teamAway: {
        defender: {
          _id: this.state.awayDefender._id,
          points: this.state.awayDefender.points
        },
        striker: {
          _id: this.state.awayStriker._id,
          points: this.state.awayStriker.points
        },
        score: this.state.awayGoals
      },
      badges: badges
    }
    await addNewMatch(match)

    Router.push('/matches')
  }

  render () {
    const showScores =
      this.state.homeDefender !== defaultPlayer &&
      this.state.homeStriker !== defaultPlayer &&
      this.state.awayDefender !== defaultPlayer &&
      this.state.awayStriker !== defaultPlayer
    return (
      <Layout>
        <GridList
          cols={2}
        >
          <MatchPlayerHeader
            enableScore={showScores}
            onScoreChange={this.onScoreChange}
            selector={'homeGoals'}
            teamLabel={'Team Home'}
          />
          <MatchPlayerSelection
            selector={'homeDefenderSelected'}
            team={'teamHome'}
            role={'defender'}
            player={this.state.homeDefender}
            selectionHandler={this.showPlayersSelect('homeDefender')}
          />
          <MatchPlayerSelection
            selector={'homeStrikerSelected'}
            team={'teamHome'}
            role={'striker'}
            player={this.state.homeStriker}
            selectionHandler={this.showPlayersSelect('homeStriker')}
          />
          <MatchPlayerHeader
            enableScore={showScores}
            onScoreChange={this.onScoreChange}
            selector={'awayGoals'}
            teamLabel={'Team Away'}
          />
          <MatchPlayerSelection
            selector={'awayDefenderSelected'}
            team={'teamAway'}
            role={'defender'}
            pointer={'awayDefender'}
            player={this.state.awayDefender}
            selectionHandler={this.showPlayersSelect('awayDefender')}
          />
          <MatchPlayerSelection
            selector={'awayStrikerSelected'}
            team={'teamAway'}
            role={'striker'}
            player={this.state.awayStriker}
            selectionHandler={this.showPlayersSelect('awayStriker')}
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
        {
          this.state.showSelectionList &&
          this.state.playersList &&
          <PinnedSubheaderList
            playersList={this.state.playersList}
            onSelectPlayer={this.onSelectPlayer}
          />
        }
      </Layout>
    )
  }
}


AddMatch.getInitialState = async function getInitialProps () {
  try {
    const players = await getUsersList()
    return {
      playersList: players
    }
  } catch (err) {
    console.log(err)
    return {
      playersList: []
    }
  }
}


export default AddMatch
