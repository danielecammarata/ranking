import {
  Avatar,
  GridListTile
} from '@material-ui/core'
import { useMatchPlayers, actions } from '../../hooks/useMatchPlayers'

const MatchStartButton = ({
  classes
}) => {
  const [players, dispatch] = useMatchPlayers()
  return (
    <GridListTile
      className={classes.styleButtonGo}
      style={{
        height: 75,
        paddingTop: 10,
        width: 60,
      }}
      >
      <Avatar
        style={{
          height: 55,
          width: 55,
          padding: 0,
          backgroundColor: players.arrSelectedPlayersId.length === 4 ? 'green' : '#bdbdbd'
        }}
        onClick={() => dispatch({type: actions.SELECTION_READY})}
      >GO</Avatar>
    </GridListTile>
  )
}

export default MatchStartButton
