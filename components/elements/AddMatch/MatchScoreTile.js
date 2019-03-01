import {
  Avatar,
  Badge,
  GridListTile
} from '@material-ui/core'

const MatchScoreTile = ({
  classes,
  score,
  scoreDefender,
  scoreStriker,
  isHomeTeam = false
}) =>
  <GridListTile
    className={classes.styleScoreWrapper}
    style={{
      height: 'auto',
      overflow: 'visible',
      padding: '10px 0px',
      width: 60,
    }}
  >
    <Avatar className={classes.styleScore}>{`${score}`}</Avatar>
    <Badge color="secondary" badgeContent={<small>{scoreDefender}</small>}
      className={classes.styleScorePlayer}
      style={{
        left: isHomeTeam && 11,
        right: !isHomeTeam && 13,
        top: 3,
    }}/>
    <Badge color="secondary" badgeContent={<small>{scoreStriker}</small>}
      className={classes.styleScorePlayer}
      style={{
        left: isHomeTeam && 11,
        right: !isHomeTeam && 13,
        top: 45,
    }}/>
  </GridListTile>

export default MatchScoreTile
