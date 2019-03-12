import React, { useReducer, useContext } from 'react'

const actions = Object.freeze({
  RESET_SCORE: Symbol("reset_score"),

  PANEL_TEAM_GOALS_SELECT: Symbol("panel_team_goals_select"),
  PANEL_ROLE_GOALS_SELECT: Symbol("panel_role_goals_select"),

  SET_HOME_SCORE: Symbol("set_home_score"),
  SET_AWAY_SCORE: Symbol("set_away_score"),
  INCREMENT_HOME_SCORE: Symbol("increment_home_score"),
  INCREMENT_AWAY_SCORE: Symbol("increment_away_score"),

  SET_HOME_DEFENDER_SCORE: Symbol("set_home_defender_score"),
  SET_HOME_STRIKER_SCORE: Symbol("set_home_striker_score"),
  SET_AWAY_DEFENDER_SCORE: Symbol("set_away_defender_score"),
  SET_AWAY_STRIKER_SCORE: Symbol("set_away_striker_score"),
  INCREMENT_HOME_DEFENDER_SCORE: Symbol("increment_home_defender_score"),
  INCREMENT_HOME_STRIKER_SCORE: Symbol("increment_home_striker_score"),
  INCREMENT_AWAY_DEFENDER_SCORE: Symbol("increment_away_defender_score"),
  INCREMENT_AWAY_STRIKER_SCORE: Symbol("increment_away_striker_score")
})

const initialState = {
  panelExpanded: actions.PANEL_TEAM_GOALS_SELECT,
  homeScore: 0,
  awayScore: 0,
  homeDefScore: 0,
  homeStrScore: 0,
  awayDefScore: 0,
  awayStrScore: 0,
  scoreReady: false,
  getScore: function (side) {
    return {
      score: this[`${side}Score`],
      defScore: this[`${side}DefScore`],
      strScore: this[`${side}StrScore`],
    }
  }
}

const scoreReady = (teamAScore, teamBScore) =>
  (teamAScore > 5 && (teamAScore - teamBScore) > 1) ||
  (teamBScore > 5 && (teamBScore - teamAScore) > 1)

const getOtherRole = (team, role) =>
  role.toLowerCase() === 'def' ? `${team}StrScore` : `${team}DefScore`

const getOtherTeamScore = (team) =>
  team === 'home' ? 'awayScore' : 'homeScore'

const setScore = ({
    state, team, score
  }) =>
    Object.assign({},
      state,
      {
        [`${team}Score`]: score,
        [`${team}DefScore`]: Math.floor(score / 2),
        [`${team}StrScore`]: Math.ceil(score / 2),
        scoreReady: scoreReady(score, state[getOtherTeamScore(team)])
      }
    )

const setRoleScore = ({
  state, team, role, score
}) =>
  Object.assign({},
    state,
    {
      [`${team}Score`]: state[getOtherRole(team, role)] + score,
      [`${team}${role}Score`]: score,
      scoreReady: scoreReady(state[getOtherRole(team, role)] + score, state[getOtherTeamScore(team)])
    }
  )

const reducer = (state, action) => {
  switch (action.type) {
    case actions.RESET_SCORE:
      return initialState
    case actions.PANEL_TEAM_GOALS_SELECT:
      return state.panelExpanded !== actions.PANEL_TEAM_GOALS_SELECT ?
        Object.assign({}, initialState, {panelExpanded: actions.PANEL_TEAM_GOALS_SELECT}) :
        state
    case actions.PANEL_ROLE_GOALS_SELECT:
      return state.panelExpanded !== actions.PANEL_ROLE_GOALS_SELECT ?
        Object.assign({}, initialState, {panelExpanded: actions.PANEL_ROLE_GOALS_SELECT}) :
        state
    case actions.SET_HOME_SCORE:
      return setScore({ state, team: 'home', score: action.score })
    case actions.SET_AWAY_SCORE:
      return setScore({ state, team: 'away', score: action.score })
    case actions.INCREMENT_HOME_SCORE:
      return setScore({ state, team: 'home', score: state.homeScore + 1 })
    case actions.INCREMENT_AWAY_SCORE:
      return setScore({ state, team: 'away', score: state.awayScore + 1 })
    case actions.SET_HOME_DEFENDER_SCORE:
      return setRoleScore({ state, team: 'home', role: 'Def', score: action.score })
    case actions.SET_HOME_STRIKER_SCORE:
      return setRoleScore({ state, team: 'home', role: 'Str', score: action.score })
    case actions.SET_AWAY_DEFENDER_SCORE:
      return setRoleScore({ state, team: 'away', role: 'Def', score: action.score })
    case actions.SET_AWAY_STRIKER_SCORE:
      return setRoleScore({ state, team: 'away', role: 'Str', score: action.score })
    case actions.INCREMENT_HOME_DEFENDER_SCORE:
      return setRoleScore({ state, team: 'home', role: 'Def', score: state.homeDefScore + 1 })
    case actions.INCREMENT_HOME_STRIKER_SCORE:
      return setRoleScore({ state, team: 'home', role: 'Str', score: state.homeStrScore + 1 })
    case actions.INCREMENT_AWAY_DEFENDER_SCORE:
      return setRoleScore({ state, team: 'away', role: 'Def', score: state.awayDefScore + 1 })
    case actions.INCREMENT_AWAY_STRIKER_SCORE:
      return setRoleScore({ state, team: 'away', role: 'Str', score: state.awayStrScore + 1 })
    default:
      throw new Error()
  }
}

const ScoreContext = React.createContext()

const ScoreProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState)
  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  )
}

const useScore = () => {
  const contextValue = useContext(ScoreContext)
  return contextValue
}

export {
  // helper functions
  initialState,
  reducer,
  scoreReady,
  // hook functions
  ScoreProvider,
  actions,
  useScore
}
