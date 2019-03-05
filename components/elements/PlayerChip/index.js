import {
  Avatar,
  Chip
} from '@material-ui/core'

const styleTeamPlayer = position => ({
  flexDirection: position === 'right' ? 'row-reverse' : 'initial',
  justifyContent: 'flex-start',
  marginBottom: '5px',
  padding: '0 5px',
  width: '100%'
})

const PlayerChip = ({
  avatarUrl,
  name,
  playerSide // left or right
}) =>
  <Chip
    avatar={<Avatar src={avatarUrl} />}
    label={name}
    style={styleTeamPlayer(playerSide)}
  />

export default PlayerChip
