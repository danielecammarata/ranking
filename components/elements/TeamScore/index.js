import Link from 'next/link'
import { Badge, Fab, GridListTile } from '@material-ui/core'

const styleMatchScore = {
  height: '78px',
  lineHeight: '70px',
  position: 'relative',
  textAlign: 'center',
  width: '60px'
}

const stylePlayerScore = (role, team) => ({
  backgorundColor: 'blue',
  left: team === 'home' ? '20%' : 'inherit',
  position: 'absolute',
  right: team === 'away' ? '20%' : 'inherit',
  top: role === 'defender' ? '14px' : '60px',
  zIndex: 1,
})

const TeamScore = ({
  matchId,
  score,
  defScore,
  strScore,
  teamPlace
}) =>
  <GridListTile style={styleMatchScore}>
    <Link as={`/match/${matchId}`} href={`/matches/detail/?slug=${matchId}`}>
      <Fab size="medium" color="primary">
        {score}
      </Fab>
    </Link>
    <Badge color="secondary" badgeContent={<small>{defScore}</small>} style={stylePlayerScore('defender', teamPlace)}> </Badge>
    <Badge color="secondary" badgeContent={<small>{strScore}</small>} style={stylePlayerScore('striker', teamPlace)}> </Badge>
  </GridListTile>

export default TeamScore
