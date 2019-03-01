import React from 'react'
import {
  Avatar,
  Button,
  Typography
} from '@material-ui/core'

class PlayerChip extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  onSelection = () => {
    if (this.props.canSelect || this.props.selected) {
      this.props.onSelection(this.props.player, this.props.index)
    }
  }

  render() {
    const { player } = this.props
    const key = player.name.replace(/\s/g, '')
    return (
      <Button
        color={this.props.selected ? 'primary' : 'default'}
        key={key}
        variant="extendedFab"
        style={{
          height: 25,
          justifyContent: 'flex-start',
          margin: '15px 5px 0',
          minHeight: 25,
          overflow: 'hidden',
          padding: '0px 10px 0px 0px',
          width: 'calc(33% - 10px)',
        }}
        onClick={this.onSelection}
      >
        <Avatar
          src={player.avatarUrl}
          style={{
            height: 25,
            width: 25,
            marginRight: 5,
          }}
        />
        <Typography style={{whiteSpace: 'nowrap', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(33vw - 52px)', textAlign: 'left'}}>
          {player.name}
        </Typography>
      </Button>
    )
  }
}

export default PlayerChip
