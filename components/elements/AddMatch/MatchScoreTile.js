import {
  Avatar,
  Badge,
  GridListTile
} from '@material-ui/core'
import { useScore } from '../../hooks/useScore'

const MatchScoreTile = ({
  classes,
  scoreKey = "awayScore",
  scoreDefenderKey = "awayDefScore",
  scoreStrikerKey = "awayStrScore",
  isHomeTeam = false
}) => {
  const [score] = useScore()
  return (
    <GridListTile
      className={classes.styleScoreWrapper}
      style={{
        height: 'auto',
        overflow: 'visible',
        padding: '10px 0px',
        width: 60,
      }}
    >
      <Avatar className={classes.styleScore}>{`${score[scoreKey]}`}</Avatar>
      <Badge color="secondary" badgeContent={<small>{score[scoreDefenderKey]}</small>}
        className={classes.styleScorePlayer}
        style={{
          left: isHomeTeam && 11,
          right: !isHomeTeam && 13,
          top: 3,
      }}/>
      <Badge color="secondary" badgeContent={<small>{score[scoreStrikerKey]}</small>}
        className={classes.styleScorePlayer}
        style={{
          left: isHomeTeam && 11,
          right: !isHomeTeam && 13,
          top: 45,
      }}/>
    </GridListTile>
  )
}

export default MatchScoreTile
