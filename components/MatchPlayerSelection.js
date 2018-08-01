import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import getRootUrl from '../lib/api/getRootUrl'
import { styleForm} from '../lib/SharedStyles'

const styles = theme => ({
  tile: {
    width: '218px',
    height: '218px',
    margin: '2px'
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },

  ul: {
    backgroundColor: 'inherit',
    cursor: 'pointer'
  }
})

class MatchPlayerSelection extends React.PureComponent {
  render () {
    const {classes, player} = this.props

    return (
      <GridListTile
        cols={1}
        rows={1}
        className={classes.tile}
      >
        <img
          src={player.avatarUrl}
          alt={player.name}
          onError={() => this.src = `${getRootUrl()}/img/user_placeholder.jpg`}
        />
        {player.name &&
        <GridListTileBar
          title={player.name}
        />
        }
        <Button
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          onClick={this.props.selectionHandler}
        >
          <AddIcon/>
        </Button>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(MatchPlayerSelection)
