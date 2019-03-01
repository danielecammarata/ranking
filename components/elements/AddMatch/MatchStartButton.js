import {
  Avatar,
  GridListTile
} from '@material-ui/core'

const MatchStartButton = ({
  classes,
  numSelectedPlayers,
  onMatchStart
}) =>
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
        backgroundColor: numSelectedPlayers === 4 ? 'green' : '#bdbdbd'
      }}
      onClick={onMatchStart}
    >GO</Avatar>
  </GridListTile>

export default MatchStartButton
