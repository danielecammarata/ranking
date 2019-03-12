import {
  Avatar,
  Chip,
  GridListTile
} from '@material-ui/core'
import { useMatchPlayers } from '../../hooks/useMatchPlayers'

const styleTeamPlayer = position => ({
  flexDirection: position=='right'? 'row-reverse' : 'initial',
  justifyContent: 'flex-start',
  marginBottom: '5px',
  padding: '0 5px',
  width:'100%',
})

const styleTeamTile = position => ({
  height: '78px',
  textAlign: position? position : 'left',
})

const Team = ({
  classes,
  side // left home || right away
}) => {
  const [players] = useMatchPlayers()
  const defender = side === 'left' ? players.homeDefender : players.awayDefender
  const striker = side === 'left' ? players.homeStriker : players.awayStriker

  return (
    <GridListTile
      style={styleTeamTile(side)}
      className={
        side === 'left' ?
          classes.styleTeamTile :
          classes.styleTeamTile + ' ' + classes.styleAwayTeam
      }
    >
      <Chip
        avatar={<Avatar src={defender.avatarUrl} />}
        label={defender.name}
        style={styleTeamPlayer(side)}
      />
      <Chip
        avatar={<Avatar src={striker.avatarUrl} />}
        label={striker.name}
        style={styleTeamPlayer(side)}
      />
    </GridListTile>
  )
}
export default Team
