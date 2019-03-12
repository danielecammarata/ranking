import React from 'react'
import {
  Avatar,
  Button,
  Fab,
  Typography
} from '@material-ui/core'
import { useMatchPlayers, actions } from '../../hooks/useMatchPlayers'


const SelectablePlayer = ({
  player
}) => {
  const [players, dispatch] = useMatchPlayers()
  return (
    <Fab
      color={
        players.arrSelectedPlayersId.indexOf(player._id) > -1
        ? 'primary' : 'default'
      }
      key={player.name.replace(/\s/g, '')}
      variant="extended"
      style={{
        height: 25,
        justifyContent: 'flex-start',
        margin: '15px 5px 0',
        minHeight: 25,
        overflow: 'hidden',
        padding: '0px 10px 0px 0px',
        width: 'calc(33% - 10px)',
      }}
      onClick={() => dispatch({type: actions.PLAYER_SELECT, player: player})}
    >
      <Avatar
        src={player.avatarUrl}
        style={{
          height: 25,
          width: 25,
          marginRight: 5,
        }}
      />
      <Typography
        style={{
          whiteSpace: 'nowrap',
          fontSize: '11px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 'calc(33vw - 52px)',
          textAlign: 'left'
        }}
        variant="caption"
      >
        {player.name}
      </Typography>
    </Fab>
  )
}

export default SelectablePlayer
