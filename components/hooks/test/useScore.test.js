import renderer from 'react-test-renderer'

import {
  initialState,
  actions,
  reducer,
  scoreReady,
  ScoreProvider,
  useScore
} from '../useScore'

import {
  getScoreAction,
  getExpectedScoreObjectForAction
} from './data'

describe('useScore hook', () => {
  it('should use the score context', () => {
    const MyComp = () => {
      const [score] = useScore()
      return <div>{score.homeScore}</div>
    }
    const component = renderer.create(
      <ScoreProvider>
        <MyComp />
      </ScoreProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('initialState functions', () => {
    it('should return the score for the team', () => {
      expect(initialState.getScore('home')).toEqual({
        score: 0,
        defScore: 0,
        strScore: 0
      })
    })
  })

  describe('score ready', () => {
    it('should return score ready when team a have more than 5 goals and two more than team b', () => {
      expect(scoreReady(6, 0)).toBeTruthy()
    })

    it('should return score ready when team b have more than 5 goals and two more than team a', () => {
      expect(scoreReady(0, 6)).toBeTruthy()
    })

    it('should return score not ready when team b have more than 5 goals but less than two from team a', () => {
      expect(scoreReady(5, 6)).toBeFalsy()
    })
  })

  describe('reducer', () => {
    it('should reset state when changing expanded panel to team goals from role goals', () => {
      const state = {
        panelExpanded: actions.PANEL_ROLE_GOALS_SELECT
      }
      const action = {
        type: actions.PANEL_TEAM_GOALS_SELECT
      }
      expect(reducer(state, action)).toEqual(
        Object.assign({}, initialState, {panelExpanded: actions.PANEL_TEAM_GOALS_SELECT})
      )
    })

    it('should keep state when already in team goals expanded panel', () => {
      const state = {
        panelExpanded: actions.PANEL_TEAM_GOALS_SELECT,
        score: 6
      }
      const action = {
        type: actions.PANEL_TEAM_GOALS_SELECT
      }
      expect(reducer(state, action)).toEqual(state)
    })

    it('should reset state when changing expanded panel to role goals from team goals', () => {
      const state = {
        panelExpanded: actions.PANEL_TEAM_GOALS_SELECT
      }
      const action = {
        type: actions.PANEL_ROLE_GOALS_SELECT
      }
      expect(reducer(state, action)).toEqual(
        Object.assign({}, initialState, {panelExpanded: actions.PANEL_ROLE_GOALS_SELECT})
      )
    })

    it('should keep state when already in role goals expanded panel', () => {
      const state = {
        panelExpanded: actions.PANEL_ROLE_GOALS_SELECT,
        score: 6
      }
      const action = {
        type: actions.PANEL_ROLE_GOALS_SELECT
      }
      expect(reducer(state, action)).toEqual(state)
    })

    it('should return the initial state on reset score action', () => {
      expect(reducer(null, {type: actions.RESET_SCORE})).toEqual(initialState)
    })

    it('should set the home score on set home score action', () => {
      const action = getScoreAction(actions.SET_HOME_SCORE, {score: 6})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_HOME_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should set the away score on set away score action', () => {
      const action = getScoreAction(actions.SET_AWAY_SCORE, {score: 6})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_AWAY_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the home score on increment home score action', () => {
      const action = getScoreAction(actions.INCREMENT_HOME_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_HOME_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the away score on increment away score action', () => {
      const action = getScoreAction(actions.INCREMENT_AWAY_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_AWAY_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should set the home defender score on set defender home score action', () => {
      const action = getScoreAction(actions.SET_HOME_DEFENDER_SCORE, {score: 3})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_HOME_DEFENDER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should set the home striker score on set striker home score action', () => {
      const action = getScoreAction(actions.SET_HOME_STRIKER_SCORE, {score: 3})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_HOME_STRIKER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should set the away defender score on set defender away score action', () => {
      const action = getScoreAction(actions.SET_AWAY_DEFENDER_SCORE, {score: 3})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_AWAY_DEFENDER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should set the away striker score on set striker away score action', () => {
      const action = getScoreAction(actions.SET_AWAY_STRIKER_SCORE, {score: 3})
      const expectedResult = getExpectedScoreObjectForAction(actions.SET_AWAY_STRIKER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the home defender score on increment defender home score action', () => {
      const action = getScoreAction(actions.INCREMENT_HOME_DEFENDER_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_HOME_DEFENDER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the home striker score on increment striker home score action', () => {
      const action = getScoreAction(actions.INCREMENT_HOME_STRIKER_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_HOME_STRIKER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the away defender score on increment defender away score action', () => {
      const action = getScoreAction(actions.INCREMENT_AWAY_DEFENDER_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_AWAY_DEFENDER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should increment the away striker score on increment striker away score action', () => {
      const action = getScoreAction(actions.INCREMENT_AWAY_STRIKER_SCORE)
      const expectedResult = getExpectedScoreObjectForAction(actions.INCREMENT_AWAY_STRIKER_SCORE)
      expect(reducer(initialState, action)).toEqual(expectedResult)
    })

    it('should throw Error without a specified action', () => {
      expect(() => reducer(null, {type: null})).toThrow(Error)
    })
  })

  describe('ScoreProvider', () => {
    it('should render the score provider', () => {
      const component = renderer.create(
        <ScoreProvider>none</ScoreProvider>
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
