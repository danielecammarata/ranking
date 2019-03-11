import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import {
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../../components/Layout'
import AudioPlayer from '../../components/audioPlayer'

import { addNewMatch } from '../../lib/api/match'
import { getUsersList } from '../../lib/api/users'

import {
  styleMatchTile
} from '../../lib/ListOfMatches.js'

import {
  ExpansionPanels,
  MatchScoreTile,
  MatchStartButton,
  SelectablePlayer,
  Team
} from '../../components/elements/AddMatch'
import {
  ScoreProvider,
  useScore,
  actions as scoreActions
} from '../../components/hooks/useScore'

import {
  MatchPlayersProvider,
  useMatchPlayers,
  matchViewState,
  actions as playerActions
} from '../../components/hooks/useMatchPlayers'

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

const AddMatch = ({
  classes
}) =>
  <Layout style={{position: 'relative'}}>
    <AudioPlayer />
    <MatchPlayersProvider>
      <ScoreProvider>
        <NewMatch classes={classes} />
      </ScoreProvider>
    </MatchPlayersProvider>
  </Layout>

const NewMatch = ({
  classes
}) => {
  const [players, playersDispatch] = useMatchPlayers()
  const [score, scoreDispatch] = useScore()

  const [data, setData] = useState([])
  useEffect(() => {
    playersDispatch({type: playerActions.RESET_PLAYER_SELECTION})
    scoreDispatch({type: scoreActions.RESET_SCORE})
    getUsersList().then(result => {
      setData(result)
    })
  }, [false])

  const saveMatch = async () => {
    const match = {
      teamHome: {
        ...players.getTeam('home'),
        ...score.getScore('home')
      },
      teamAway: {
        ...players.getTeam('away'),
        ...score.getScore('away')
      }
    }
    await addNewMatch(match)
  }

  const onSave = async () => {
    await saveMatch()
    Router.push('/')
  }

  const onContinue = async () => {
    await saveMatch()
    scoreDispatch({type: scoreActions.RESET_SCORE})
  }

  const onNew = async () => {
    await saveMatch()
    playersDispatch({type: playerActions.RESET_PLAYER_SELECTION})
    scoreDispatch({type: scoreActions.RESET_SCORE})
  }

  return (
    <>
      <GridList style={{margin: '0 auto', maxWidth: '500px'}}>
        <GridListTile style={styleMatchTile}>
          <GridList style={{lineHeight: '15px', overflow: 'hidden'}}>
            <Team
              classes={classes}
              side="left"
            />
            {players.matchView === matchViewState.PLAYER_SELECTION &&
              <MatchStartButton
                classes={classes}
              />
            }
            {players.matchView === matchViewState.TEAMS_COMPLETE &&
              <MatchScoreTile
                classes={classes}
                scoreKey="homeScore"
                scoreDefenderKey="homeDefScore"
                scoreStrikerKey="homeStrScore"
                isHomeTeam
              />
            }
            <Team
              classes={classes}
              side="right"
            />
            {players.matchView === matchViewState.TEAMS_COMPLETE &&
              <MatchScoreTile
                classes={classes}
              />
            }
          </GridList>
        </GridListTile>
      </GridList>
      {players.matchView === matchViewState.PLAYER_SELECTION &&
        <Grid
          style={{margin: '0 auto', maxWidth: '100%'}}
        >
          {data.map((player, index) => (
            <SelectablePlayer
              key={`playerChip${index}`}
              player={player}
            />
          ))}
        </Grid>
      }
      {players.matchView === matchViewState.TEAMS_COMPLETE &&
        <ExpansionPanels
          onContinue={() => onContinue()}
          onSave={() => onSave()}
          onNew={() => onNew()}
        />
      }
    </>
  )
}

export default withStyles(styles)(AddMatch)
