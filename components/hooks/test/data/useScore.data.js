import {
  initialState,
  actions
} from '../../useScore'

export const getScoreAction = (actionType, rest) => {
  return {
    type: actionType,
    ...rest
  }
}

export const getExpectedScoreObjectForAction = (actionType) => {
  switch (actionType) {
    case actions.SET_HOME_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 6,
          homeDefScore: 3,
          homeStrScore: 3,
          scoreReady: true
        }
      )
    case actions.SET_AWAY_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 6,
          awayDefScore: 3,
          awayStrScore: 3,
          scoreReady: true
        }
      )
    case actions.INCREMENT_HOME_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 1,
          homeDefScore: 0,
          homeStrScore: 1,
          scoreReady: false
        }
      )
    case actions.INCREMENT_AWAY_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 1,
          awayDefScore: 0,
          awayStrScore: 1,
          scoreReady: false
        }
      )
    case actions.SET_HOME_DEFENDER_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 3,
          homeDefScore: 3,
          homeStrScore: 0,
          scoreReady: false
        }
      )
    case actions.SET_HOME_STRIKER_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 3,
          homeDefScore: 0,
          homeStrScore: 3,
          scoreReady: false
        }
      )
    case actions.SET_AWAY_DEFENDER_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 3,
          awayDefScore: 3,
          awayStrScore: 0,
          scoreReady: false
        }
      )
    case actions.SET_AWAY_STRIKER_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 3,
          awayDefScore: 0,
          awayStrScore: 3,
          scoreReady: false
        }
      )
    case actions.INCREMENT_HOME_DEFENDER_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 1,
          homeDefScore: 1,
          homeStrScore: 0,
          scoreReady: false
        }
      )
    case actions.INCREMENT_HOME_STRIKER_SCORE:
      return Object.assign({},
        initialState,
        {
          homeScore: 1,
          homeDefScore: 0,
          homeStrScore: 1,
          scoreReady: false
        }
      )
    case actions.INCREMENT_AWAY_DEFENDER_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 1,
          awayDefScore: 1,
          awayStrScore: 0,
          scoreReady: false
        }
      )
    case actions.INCREMENT_AWAY_STRIKER_SCORE:
      return Object.assign({},
        initialState,
        {
          awayScore: 1,
          awayDefScore: 0,
          awayStrScore: 1,
          scoreReady: false
        }
      )
  }


}
