import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import React from 'react'
import Router from 'next/router'
import getRootUrl from '../../lib/api/getRootUrl'
import Layout from '../../components/Layout.js'
import { addNewMatch } from '../../lib/api/match'
import { getUsersList } from '../../lib/api/users'

import {
  styleMatchScore,
  styleMatchTile,
  stylePlayerScore,
  styleTeamTile,
  styleTeamPlayer
} from '../../lib/ListOfMatches.js'


import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import { Typography, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Badge } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


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

      matchScore: '0 - 0',

      homeScore: 0,
      awayScore: 0,

      homeScoreDefender: 0,
      homeScoreStriker: 0,
      awayScoreDefender: 0,
      awayScoreStriker: 0,

      canSave: false,
      canSaveDetail: false,

      expanded: 'panelMatchGoals',



      activeSelection: null,
      awayDefenderSelected: false,
      awayGoals: NaN,
      awayGoalsDefender: NaN,
      awayGoalsStriker: NaN,
      awayStrikerSelected: false,
      badges: [],
      enableScore: false,
      homeDefenderSelected: false,
      homeGoals: NaN,
      homeGoalsDefender: NaN,
      homeGoalsStriker: NaN,
      homeStrikerSelected: false,
      matchAdded: false,
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
      this.setState({ matchView: matchViewState.TEAMS_COMPLETE })
    }
  }

  onPlayerSelect = (player, index) => {
    let selectedIndexes = this.state.arrSelectedPlayerIndex
    if (!selectedIndexes.includes(index)) {
      const playersCount = this.state.selectedPlayers + 1
      selectedIndexes.push(index)
      if (this.state.homeDefender === defaultPlayer) {
        this.setState({ homeDefender: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.homeStriker === defaultPlayer) {
        this.setState({ homeStriker: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.awayDefender === defaultPlayer) {
        this.setState({ awayDefender: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.awayStriker === defaultPlayer) {
        this.setState({ awayStriker: player, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      }
    } else {
      const playersCount = this.state.selectedPlayers - 1
      selectedIndexes.splice(selectedIndexes.indexOf(index), 1)
      if (this.state.homeDefender === player) {
        this.setState({ homeDefender: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.homeStriker === player) {
        this.setState({ homeStriker: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.awayDefender === player) {
        this.setState({ awayDefender: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
      } else if (this.state.awayStriker === player) {
        this.setState({ awayStriker: defaultPlayer, selectedPlayers: playersCount, arrSelectedPlayerIndex: selectedIndexes })
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

  onScorePlayerSelection = (score, team, role) => {
    this.setState({ [`${team}Score${role}`]: score }, () =>{
      const homeScore = this.state.homeScoreDefender + this.state.homeScoreStriker
      const awayScore = this.state.awayScoreDefender + this.state.awayScoreStriker
      const canSave = (homeScore > 5 && (homeScore - awayScore) > 1) ||
                    (awayScore > 5 && (awayScore - homeScore) > 1)
      this.setState({ canSaveDetail: canSave, homeScore: homeScore, awayScore: awayScore })
    })
  }

  calculateScoreAndBadges = () => {
    const scoreAndBadges = {
      badges: []
    }
    if (this.state.homeScore === 0 || this.state.awayScore === 0) {
      scoreAndBadges.badges.push('cappotto')
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

  saveMatch = async () => {
    const scoreAndBadges = this.calculateScoreAndBadges()
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
        score: this.state.homeScore,
        defScore: scoreAndBadges.homeScoreDefender,
        strScore: scoreAndBadges.homeScoreStriker,
        defBadges: [],
        strBadges: []
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
      <Layout>

        <GridList style={{margin: '0 auto', maxWidth: '500px', minWidth: '350px'}}>
          <GridListTile style={styleMatchTile}>
            <GridList>
              <GridListTile style={styleTeamTile('right')}>
                <Chip
                  avatar={<Avatar src={this.state.homeDefender.avatarUrl} />}
                  label={this.state.homeDefender.name}
                  style={styleTeamPlayer('right')}
                />
                <Chip
                  avatar={<Avatar src={this.state.homeStriker.avatarUrl} />}
                  label={this.state.homeStriker.name}
                  style={styleTeamPlayer('right')}
                />

              </GridListTile>


                {this.state.matchView === matchViewState.PLAYER_SELECTION &&
                  <GridListTile
                    style={{
                      height: 75,
                      width: 60,
                      paddingTop: 10
                    }}
                  >
                    <Avatar
                      style={{
                        height: 55,
                        width: 55,
                        padding: 0,
                        backgroundColor: this.state.selectedPlayers === 4 ? 'green' : '#bdbdbd'
                      }}
                      onClick={this.onMatchStart}
                    >GO</Avatar>
                  </GridListTile>
                }
                {this.state.matchView === matchViewState.TEAMS_COMPLETE &&
                  <GridListTile
                    style={{
                      height: 75,
                      width: 60,
                      paddingTop: 10
                    }}
                  >
                    <Avatar
                      style={{
                        height: 55,
                        width: 55,
                        padding: 0,
                        backgroundColor: 'green',
                        fontSize: '1em'
                      }}
                    >{`${this.state.homeScore} - ${this.state.awayScore}`}</Avatar>
                    <Badge color="secondary" badgeContent={<small>{this.state.homeScoreDefender}</small>}
                      style={{
                        left: 11,
                        position: 'absolute',
                        top: 11,
                        zIndex: 1,
                    }}/>
                    <Badge color="secondary" badgeContent={<small>{this.state.homeScoreStriker}</small>}
                      style={{
                        left: 11,
                        position: 'absolute',
                        top: 52,
                        zIndex: 1,
                    }}/>
                    <Badge color="secondary" badgeContent={<small>{this.state.awayScoreDefender}</small>}
                      style={{
                        left: 45,
                        position: 'absolute',
                        top: 11,
                        zIndex: 1,
                    }}/>
                    <Badge color="secondary" badgeContent={<small>{this.state.awayScoreStriker}</small>}
                      style={{
                        left: 45,
                        position: 'absolute',
                        top: 52,
                        zIndex: 1,
                    }}/>
                  </GridListTile>
                }

              <GridListTile style={styleTeamTile('left')}>
                <Chip
                  avatar={<Avatar src={this.state.awayDefender.avatarUrl} />}
                  label={this.state.awayDefender.name}
                  style={styleTeamPlayer('left')}
                />
                <Chip
                  avatar={<Avatar src={this.state.awayStriker.avatarUrl} />}
                  label={this.state.awayStriker.name}
                  style={styleTeamPlayer('left')}
                />

              </GridListTile>
            </GridList>
          </GridListTile>
        </GridList>

        {this.state.matchView === matchViewState.PLAYER_SELECTION &&
          <Grid
            style={{margin: '0 auto', maxWidth: '500px', minWidth: '350px'}}
          >
            {this.props.players.map((player, index) => (
              <PlayerChip
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
            <ExpansionPanel
              expanded={this.state.expanded === 'panelMatchGoals'}
              onChange={this.handleExpandChange('panelMatchGoals')}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Game Goals</ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container justify="space-between">
                  <Grid item xs={6} sm={6}>Home</Grid>
                  <Grid item xs={6} sm={6}>Away</Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScore${item}`}
                        variant="contained"
                        onClick={this.onScoreSelection.bind(this, item, 'home')}
                      >{item}</Button>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScore${item}`}
                        variant="contained"
                        onClick={this.onScoreSelection.bind(this, item, 'away')}
                      >{item}</Button>
                    )}
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
              <ExpansionPanelMatchActions
                canSave={this.state.canSave}
                onContinue={this.onContinue}
                onSave={this.onSave}
                onNew={this.onNew}
              />
            </ExpansionPanel>

            <ExpansionPanel
              expanded={this.state.expanded === 'panelRoleGoals'}
              onChange={this.handleExpandChange('panelRoleGoals')}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Goals by role</ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container justify="space-between">
                  <Grid item xs={6} sm={6}>Home Defender</Grid>
                  <Grid item xs={6} sm={6}>Home Striker</Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScoreDef${item}`}
                        variant="contained"
                        onClick={this.onScorePlayerSelection.bind(this, item, 'home', 'Defender')}
                      >{item}</Button>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScoreStr${item}`}
                        variant="contained"
                        onClick={this.onScorePlayerSelection.bind(this, item, 'home', 'Striker')}
                      >{item}</Button>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6}>Away Defender</Grid>
                  <Grid item xs={6} sm={6}>Away Striker</Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScoreDef${item}`}
                        variant="contained"
                        onClick={this.onScorePlayerSelection.bind(this, item, 'away', 'Defender')}
                      >{item}</Button>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(item =>
                      <Button
                        key={`homeScoreStr${item}`}
                        variant="contained"
                        onClick={this.onScorePlayerSelection.bind(this, item, 'away', 'Striker')}
                      >{item}</Button>
                    )}
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
              <ExpansionPanelMatchActions
                canSave={this.state.canSaveDetail}
                onContinue={this.onContinue}
                onSave={this.onSave}
                onNew={this.onNew}
              />
            </ExpansionPanel>
          </div>
        }
      </Layout>
    )
  }
}

const ExpansionPanelMatchActions = ({
  canSave,
  onContinue,
  onSave,
  onNew
}) => (
  <ExpansionPanelActions>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onContinue}
    >
      Continue
    </Button>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onSave}
    >
      Save
    </Button>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onNew}
    >
      New
    </Button>
  </ExpansionPanelActions>
)

class PlayerChip extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  onSelection = () => {
    if (this.props.canSelect || this.props.selected) {
      this.props.onSelection(this.props.player, this.props.index)
    }
  }

  render() {
    const { player } = this.props
    const key = player.name.replace(/\s/g, '')
    return (
      <Button
        color={this.props.selected ? 'primary' : 'default'}
        key={key}
        variant="extendedFab"
        style={{
          minHeight: 25,
          height: 25,
          padding: 0,
          paddingRight: 10,
          margin: 5,
        }}
        onClick={this.onSelection}
      >
        <Avatar
          src={player.avatarUrl}
          style={{
            height: 25,
            width: 25,
            marginRight: 5,
          }}
        />
        <Typography>{player.name}</Typography>
      </Button>
    )
  }
}

export default AddMatch
