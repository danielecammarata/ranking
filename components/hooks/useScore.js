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

const scoreReady = (homeScore, awayScore) =>
  (homeScore > 5 && (homeScore - awayScore) > 1) ||
  (awayScore > 5 && (awayScore - homeScore) > 1)

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
      return Object.assign({},
        state,
        {
          homeScore: action.score,
          homeDefScore: Math.floor(action.score / 2),
          homeStrScore: Math.ceil(action.score / 2),
          scoreReady: scoreReady(action.score, state.awayScore)
        }
      )
    case actions.SET_AWAY_SCORE:
      return Object.assign({},
        state,
        {
          awayScore: action.score,
          awayDefScore: Math.floor(action.score / 2),
          awayStrScore: Math.ceil(action.score / 2),
          scoreReady: scoreReady(state.homeScore, action.score)
        }
      )
    case actions.INCREMENT_HOME_SCORE:
      return Object.assign({},
        state,
        {
          homeScore: state.homeScore + 1,
          homeDefScore: Math.floor((state.homeScore + 1) / 2),
          homeStrScore: Math.ceil((state.homeScore + 1) / 2),
          scoreReady: scoreReady(state.homeScore + 1, action.score)
        }
      )
    case actions.INCREMENT_AWAY_SCORE:
      return Object.assign({},
        state,
        {
          awayScore: state.awayScore + 1,
          awayDefScore: Math.floor((state.awayScore + 1) / 2),
          awayStrScore: Math.ceil((state.awayScore + 1) / 2),
          scoreReady: scoreReady(state.homeScore, state.awayScore + 1)
        }
      )
    case actions.SET_HOME_DEFENDER_SCORE:
      return Object.assign({},
        state,
        {
          homeDefScore: action.score,
          homeScore: state.homeStrScore + action.score,
          scoreReady: scoreReady(state.homeStrScore + action.score, state.awayScore)
        }
      )
    case actions.SET_HOME_STRIKER_SCORE:
      return Object.assign({},
        state,
        {
          homeStrScore: action.score,
          homeScore: state.homeDefScore + action.score,
          scoreReady: scoreReady(state.homeDefScore + action.score, state.awayScore)
        }
      )
    case actions.SET_AWAY_DEFENDER_SCORE:
      return Object.assign({},
        state,
        {
          awayDefScore: action.score,
          awayScore: state.awayStrScore + action.score,
          scoreReady: scoreReady(state.homeScore, state.awayStrScore + action.score)
        }
      )
    case actions.SET_AWAY_STRIKER_SCORE:
      return Object.assign({},
        state,
        {
          awayStrScore: action.score,
          awayScore: state.awayDefScore + action.score,
          scoreReady: scoreReady(state.homeScore, state.awayDefScore + action.score)
        }
      )

    case actions.INCREMENT_HOME_DEFENDER_SCORE:
      return Object.assign({},
        state,
        {
          homeDefScore: state.homeDefScore + 1,
          homeScore: state.homeStrScore + state.homeDefScore + 1,
          scoreReady: scoreReady(state.homeStrScore + state.homeDefScore + 1, state.awayScore)
        }
      )
    case actions.INCREMENT_HOME_STRIKER_SCORE:
      return Object.assign({},
        state,
        {
          homeStrScore: state.homeStrScore + 1,
          homeScore: state.homeStrScore + state.homeDefScore + 1,
          scoreReady: scoreReady(state.homeStrScore + state.homeDefScore + 1, state.awayScore)
        }
      )
    case actions.INCREMENT_AWAY_DEFENDER_SCORE:
      return Object.assign({},
        state,
        {
          awayDefScore: state.awayDefScore + 1,
          awayScore: state.awayDefScore + state.awayStrScore + 1,
          scoreReady: scoreReady(state.homeScore, state.awayDefScore + state.awayStrScore + 1)
        }
      )
    case actions.INCREMENT_AWAY_STRIKER_SCORE:
      return Object.assign({},
        state,
        {
          awayStrScore: state.awayStrScore + 1,
          awayScore: state.awayDefScore + state.awayStrScore + 1,
          scoreReady: scoreReady(state.homeScore, state.awayDefScore + state.awayStrScore + 1)
        }
      )
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
  ScoreProvider,
  actions,
  useScore
}
