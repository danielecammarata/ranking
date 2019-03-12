const { initialState, addPlayer, removePlayer } = require('./useMatchPlayers')

describe('useMatchPlayers hook', () => {
  // it('should return the first player available', () => {
  //   let state = initialState
  //   state.homeDefender = {}
  //   state.homeStriker = {}
  //   state.awayDefender = {}
  //   state.awayStriker = {}
  //   expect(addPlayer('', state)).toEqual(true)
  // })

  it('should remove the player by _id', () => {
    let state = Object.assign({}, initialState)
    state.homeDefender = {
      _id: 'to_be_removed'
    }
    state.selectedPlayers = 1
    const action = {
      player: {
        _id: 'to_be_removed'
      }
    }
    expect(removePlayer(action, state)).toEqual(initialState)
  })
})
