import React from 'react'
import Router from 'next/router'
import {
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../../components/Layout.js'
import AudioPlayer from '../../components/audioPlayer.js'

import getRootUrl from '../../lib/api/getRootUrl'
import { addNewMatch } from '../../lib/api/match'
import { getUsersList } from '../../lib/api/users'

import {
  styleMatchTile
} from '../../lib/ListOfMatches.js'

import {
  ExpansionPanelGameGoals,
  ExpansionPanelGoalsByRole,
  MatchScoreTile,
  MatchStartButton,
  PlayerChip,
  Team
} from '../../components/elements/AddMatch'

const styles = theme => ({
  styleTeamTile: {
    width: 'calc(100% - 90px) !important',
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
      minHeight: '130px',
      width: 'calc(50% - 60px) !important',
    }
  },

  styleButtonGo: {
    margin: '40px 0 -40px',
    [theme.breakpoints.up('sm')]: {
      margin: '20px 0 0 0',
    }
  },

  styleAwayTeam: {
    extend: 'styleTeamTile',
    [theme.breakpoints.up('sm')]: {
      order: '2',
    }
  },

  styleScore: {
    backgroundColor: '#01ad01',
    fontSize: '1em',
    height: 45,
    overflow: 'visible',
    padding: '10px 0',
    width: 45,
    [theme.breakpoints.up('sm')]: {
      margin: '20px 7px',
    }
  },

  styleScorePlayer: {
    left: 11,
    position: 'absolute',
    top: 24,
    zIndex: 1,
  },

  styleScoreWrapper: {
    '& > div': {
      overflow: 'visible',
    },
  }
})

const defaultPlayer = {
  _id: 'default',
  avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
  name: '',
  selected: false,
  showNames: false
}

const matchViewState = {
  PLAYER_SELECTION: 'PLAYER_SELECTION',
  TEAMS_COMPLETE: 'TEAMS_COMPLETE',
  SCORE_SELECTION: 'SCORE_SELECTION'
}

class AddMatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      homeDefender: defaultPlayer,
      homeStriker: defaultPlayer,

      awayDefender: defaultPlayer,
      awayStriker: defaultPlayer,

      selectedPlayers: 0,

      arrSelectedPlayerIndex: [],

      matchView: matchViewState.PLAYER_SELECTION,

      homeScore: 0,
      awayScore: 0,

      homeScoreDefender: 0,
      homeScoreStriker: 0,
      awayScoreDefender: 0,
      awayScoreStriker: 0,

      canSave: false,
      canSaveDetail: false,

      expanded: 'panelMatchGoals',

      badges: []
    }
  }

  static async getInitialProps() {
    const players = await getUsersList()
    return {
      players
    }
  }

  handleExpandChange = panel => (event, expanded) => {
    if(expanded) {
      this.setState({
        expanded: panel,
        homeScore: 0,
        awayScore: 0,
        homeScoreDefender: 0,
        homeScoreStriker: 0,
        awayScoreDefender: 0,
        awayScoreStriker: 0,
        canSave: false,
      })
    }
  }

  onMatchStart = () => {
    if (this.state.selectedPlayers === 4) {
      this.setState({ matchView: matchViewState.TEAMS_COMPLETE }, () => { this.createAndStartAudio(getRootUrl() + '/sound/go.aac') })
    }
  }

  onPlayerSelect = (player, index) => {
    this.createAndStartAudio(getRootUrl() + '/sound/player_selection.aac')
    let selectedIndexes = this.state.arrSelectedPlayerIndex
    if (!selectedIndexes.includes(index)) {
      const playersCount = this.state.selectedPlayers + 1
      selectedIndexes.push(index)
      if (this.state.homeDefender === defaultPlayer) {
        this.setState({ homeDefender: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.homeStriker === defaultPlayer) {
        this.setState({ homeStriker: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.awayDefender === defaultPlayer) {
        this.setState({ awayDefender: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.awayStriker === defaultPlayer) {
        this.setState({ awayStriker: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      }
    } else {
      const playersCount = this.state.selectedPlayers - 1
      selectedIndexes.splice(selectedIndexes.indexOf(index), 1)
      if (this.state.homeDefender === player) {
        this.setState({ homeDefender: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.homeStriker === player) {
        this.setState({ homeStriker: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.awayDefender === player) {
        this.setState({ awayDefender: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      } else if (this.state.awayStriker === player) {
        this.setState({ awayStriker: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes }, () => { this.isReady() })
      }
    }
  }

  onScoreSelection = (score, team) => {
    this.setState({ [`${team}Score`]: score }, () =>{
      const canSave = (this.state.homeScore > 5 && (this.state.homeScore - this.state.awayScore) > 1) ||
                    (this.state.awayScore > 5 && (this.state.awayScore - this.state.homeScore) > 1)
      this.setState({ canSave: canSave })
    })
  }

  onScoreSelectionAddOne = (score, team) => {
    this.onScoreSelection(score + 1, team)
  }

  onScorePlayerSelection = (score, team, role) => {
    this.setState({ [`${team}Score${role}`]: score }, () =>{
      const homeScore = this.state.homeScoreDefender + this.state.homeScoreStriker
      const awayScore = this.state.awayScoreDefender + this.state.awayScoreStriker
      const canSave = (homeScore > 5 && (homeScore - awayScore) > 1) ||
                    (awayScore > 5 && (awayScore - homeScore) > 1)
      this.setState({ canSaveDetail: canSave, homeScore: homeScore, awayScore: awayScore })
    })
  }

  onScorePlayerSelectionAddOne = (score, team, role) => {
    this.onScorePlayerSelection(score + 1, team, role)
  }

  calculateScoreAndBadges = () => {
    const scoreAndBadges = {
      badges: []
    }
    if (this.state.homeScore === 0 || this.state.awayScore === 0) {
      scoreAndBadges.badges.push('cappotto')
      this.createAndStartAudio(getRootUrl() + '/sound/perfect.aac')
    }

    if (this.state.homeScoreDefender + this.state.homeScoreStriker !== this.state.homeScore) {
      scoreAndBadges.homeScoreDefender = Math.floor(this.state.homeScore / 2)
      scoreAndBadges.homeScoreStriker = Math.ceil(this.state.homeScore / 2)
    } else {
      scoreAndBadges.homeScoreDefender = this.state.homeScoreDefender
      scoreAndBadges.homeScoreStriker = this.state.homeScoreStriker
    }

    if (this.state.awayScoreDefender + this.state.awayScoreStriker !== this.state.awayScore) {
      scoreAndBadges.awayScoreDefender = Math.floor(this.state.awayScore / 2)
      scoreAndBadges.awayScoreStriker = Math.ceil(this.state.awayScore / 2)
    } else {
      scoreAndBadges.awayScoreDefender = this.state.awayScoreDefender
      scoreAndBadges.awayScoreStriker = this.state.awayScoreStriker
    }

    return scoreAndBadges
  }

  getPlayerFromState = (playerRole) => {
    return {
      _id: this.state[playerRole]._id,
      points: this.state[playerRole].points,
      stats: this.state[playerRole].stats,
      last_match: new Date()
    }
  }

  saveMatch = async () => {
    const scoreAndBadges = this.calculateScoreAndBadges()
    const match = {
      teamHome: {
        defender: this.getPlayerFromState ('homeDefender'),
        striker: this.getPlayerFromState ('homeStriker'),
        score: this.state.homeScore,
        defScore: scoreAndBadges.homeScoreDefender,
        strScore: scoreAndBadges.homeScoreStriker,
        defBadges: [],
        strBadges: []
      },
      teamAway: {
        defender: this.getPlayerFromState ('awayDefender'),
        striker: this.getPlayerFromState ('awayStriker'),
        score: this.state.awayScore,
        defScore: scoreAndBadges.awayScoreDefender,
        strScore: scoreAndBadges.awayScoreStriker,
        defBadges: [],
        strBadges: []
      },
      badges: scoreAndBadges.badges
    }
    await addNewMatch(match)
  }

  onContinue = async () => {
    await this.saveMatch()
    this.setState({
      matchView: matchViewState.PLAYER_SELECTION,
      homeScore: 0,
      awayScore: 0,
      canSave: false,
      expanded: 'panelMatchGoals',
    })
  }

  createAndStartAudio = (audioFile) => {
    const flush = new Audio(audioFile)
    flush.volume= 1.0
    flush.play()
    flush.onended = () => {
      flush.remove()
    }
  }

  isReady = () => {
    if ( this.state.selectedPlayers === 4 ) {
      setTimeout( () => {
        this.createAndStartAudio(getRootUrl() + '/sound/ready.aac')
        }, 500 )
    }
  }

  onSave = async () => {
    await this.saveMatch()
    Router.push('/')
  }

  onNew = async () => {
    await this.saveMatch()
    this.setState({
      matchView: matchViewState.PLAYER_SELECTION,
      selectedPlayers: 0,
      arrSelectedPlayerIndex: [],
      homeDefender: defaultPlayer,
      homeStriker: defaultPlayer,
      awayDefender: defaultPlayer,
      awayStriker: defaultPlayer,
      homeScore: 0,
      awayScore: 0,
      canSave: false,
      expanded: 'panelMatchGoals',
    })
  }

  render () {
    return (
      <Layout style={{position: 'relative'}}>
        <AudioPlayer />
        <GridList style={{margin: '0 auto', maxWidth: '500px'}}>
          <GridListTile style={styleMatchTile}>
            <GridList style={{lineHeight: '15px', overflow: 'hidden'}}>
              <Team
                classes={this.props.classes}
                defender={this.state.homeDefender}
                striker={this.state.homeStriker}
                side="left"
              />
              {this.state.matchView === matchViewState.PLAYER_SELECTION &&
                <MatchStartButton
                  classes={this.props.classes}
                  numSelectedPlayers={this.state.selectedPlayers}
                  onMatchStart={this.onMatchStart}
                />
              }
              {this.state.matchView === matchViewState.TEAMS_COMPLETE &&
                <MatchScoreTile
                  classes={this.props.classes}
                  score={this.state.homeScore}
                  scoreDefender={this.state.homeScoreDefender}
                  scoreStriker={this.state.homeScoreStriker}
                  isHomeTeam
                />
              }
              <Team
                classes={this.props.classes}
                defender={this.state.awayDefender}
                striker={this.state.awayStriker}
                side="right"
              />
              {this.state.matchView === matchViewState.TEAMS_COMPLETE &&
                <MatchScoreTile
                  classes={this.props.classes}
                  score={this.state.awayScore}
                  scoreDefender={this.state.awayScoreDefender}
                  scoreStriker={this.state.awayScoreStriker}
                />
              }
            </GridList>
          </GridListTile>
        </GridList>
        {this.state.matchView === matchViewState.PLAYER_SELECTION &&
          <Grid
            style={{margin: '0 auto', maxWidth: '100%'}}
          >
            {this.props.players.map((player, index) => (
              <PlayerChip
                key={`playerChip${index}`}
                index={index}
                player={player}
                onSelection={this.onPlayerSelect}
                canSelect={this.state.selectedPlayers < 4}
                selected={this.state.arrSelectedPlayerIndex.includes(index)}
              />
            ))}
          </Grid>
        }
        {this.state.matchView === matchViewState.TEAMS_COMPLETE &&
          <div>
            <ExpansionPanelGameGoals
              isExpanded={this.state.expanded === 'panelMatchGoals'}
              onExpandChange={this.handleExpandChange('panelMatchGoals')}
              onScoreHomeSelection={(item) => this.onScoreSelection.bind(this, item, 'home')}
              onScoreHomeSelectionAddOne={this.onScoreSelectionAddOne.bind(this, this.state.homeScore, 'home')}
              onScoreAwaySelection={(item) => this.onScoreSelection.bind(this, item, 'away')}
              onScoreAwaySelectionAddOne={this.onScoreSelectionAddOne.bind(this, this.state.awayScore, 'away')}
              canSave={this.state.canSave}
              onContinue={this.onContinue}
              onSave={this.onSave}
              onNew={this.onNew}
            />
            <ExpansionPanelGoalsByRole
              isExpanded={this.state.expanded === 'panelRoleGoals'}
              onExpandChange={this.handleExpandChange('panelRoleGoals')}
              onScoreHomeDefSelection={(item) => this.onScorePlayerSelection.bind(this, item, 'home', 'Defender')}
              onScoreHomeDefSelectionAddOne={this.onScorePlayerSelectionAddOne.bind(this, this.state.homeScoreDefender, 'home', 'Defender')}
              onScoreHomeStrSelection={(item) => this.onScorePlayerSelection.bind(this, item, 'home', 'Striker')}
              onScoreHomeStrSelectionAddOne={this.onScorePlayerSelectionAddOne.bind(this, this.state.homeScoreStriker, 'home', 'Striker')}
              onScoreAwayDefSelection={(item) => this.onScorePlayerSelection.bind(this, item, 'away', 'Defender')}
              onScoreAwayDefSelectionAddOne={this.onScorePlayerSelectionAddOne.bind(this, this.state.awayScoreDefender, 'away', 'Defender')}
              onScoreAwayStrSelection={(item) => this.onScorePlayerSelection.bind(this, item, 'away', 'Striker')}
              onScoreAwayStrSelectionAddOne={this.onScorePlayerSelectionAddOne.bind(this, this.state.awayScoreStriker, 'away', 'Striker')}
              canSave={this.state.canSave}
              onContinue={this.onContinue}
              onSave={this.onSave}
              onNew={this.onNew}
            />
          </div>
        }
      </Layout>
    )
  }
}

export default withStyles(styles)(AddMatch)
