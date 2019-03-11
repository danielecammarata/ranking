import React, { useReducer, useContext } from 'react'

import getRootUrl from '../../lib/api/getRootUrl'

const defaultPlayer = {
  _id: 'default',
  avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
  name: '',
  selected: false,
  showNames: false
}

const actions = Object.freeze({
  RESET_PLAYER_SELECTION: Symbol("reset_player_selection"),
  PLAYER_SELECT: Symbol("player_select"),
  SELECTION_READY: Symbol("selection_ready")
})

const matchViewState = Object.freeze({
  PLAYER_SELECTION: Symbol('PLAYER_SELECTION'),
  TEAMS_COMPLETE: Symbol('TEAMS_COMPLETE')
})

const initialState = {
  homeDefender: defaultPlayer,
  homeStriker: defaultPlayer,
  awayDefender: defaultPlayer,
  awayStriker: defaultPlayer,
  selectedPlayers: 0,
  arrSelectedPlayersId: [],
  matchView: matchViewState.PLAYER_SELECTION,
  getTeam: function (side) {
    return {
      defender: this[`${side}Defender`],
      striker: this[`${side}Striker`]
    }
  }
}

const removePlayer = (action, state) => {
  const condition = key =>
    state[key] === Object(state[key]) && // check if is object
    '_id' in state[key] && // check if has the _id key
    state[key]._id === action.player._id

  const role = Object.keys(state).filter(condition)

  return Object.assign({},
    state,
    {
      [role]: defaultPlayer,
      selectedPlayers: state.selectedPlayers - 1,
      arrSelectedPlayersId: state.arrSelectedPlayersId.filter(item => item !== action.player._id)
    }
  )
}

const addPlayer = (action, state) => {
  const availableKey = Object.keys(state).find(key => state[key] === defaultPlayer)
  state.arrSelectedPlayersId.push(action.player._id)
  return Object.assign({},
    state,
    {
      [availableKey]: action.player,
      selectedPlayers: state.selectedPlayers + 1,
    }
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.RESET_PLAYER_SELECTION:
      return Object.assign({},
        state,
        {
          homeDefender: defaultPlayer,
          homeStriker: defaultPlayer,
          awayDefender: defaultPlayer,
          awayStriker: defaultPlayer,
          selectedPlayers: 0,
          arrSelectedPlayersId: [],
          matchView: matchViewState.PLAYER_SELECTION
        }
      )
    case actions.PLAYER_SELECT:
      if (state.arrSelectedPlayersId.indexOf(action.player._id) > -1) {
        return removePlayer(action, state)
      } else if (state.arrSelectedPlayersId.length < 4) {
        return addPlayer(action, state)
      }
      return state
    case actions.SELECTION_READY:
      if (state.arrSelectedPlayersId.length < 4) {
        return state
      }
      return Object.assign({}, state, {matchView: matchViewState.TEAMS_COMPLETE})
    default:
      throw new Error()
  }
}

const MatchPlayersContext = React.createContext()

const MatchPlayersProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState)
  return (
    <MatchPlayersContext.Provider value={contextValue}>
      {children}
    </MatchPlayersContext.Provider>
  )
}

const useMatchPlayers = () => {
  const contextValue = useContext(MatchPlayersContext)
  return contextValue
}

export {
  initialState,
  reducer,
  addPlayer,
  removePlayer,

  MatchPlayersProvider,
  useMatchPlayers,
  actions,
  matchViewState
}
