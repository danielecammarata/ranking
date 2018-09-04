import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { withStyles } from '@material-ui/core/styles'
import getRootUrl from '../lib/api/getRootUrl'

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
    const { classes, player, selectionHandler, disableSelection} = this.props

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
        {!disableSelection &&
          <Button
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            onClick={selectionHandler}
          >
            <AddIcon/>
          </Button>
        }
      </GridListTile>
    )
  }
}

MatchPlayerSelection.defaultProps = {
  disableSelection: false
}

MatchPlayerSelection.propTypes = {
  classes: PropTypes.object,
  player: PropTypes.object,
  selectionHandler: PropTypes.func.isRequired,
  disableSelection: PropTypes.bool
}

export default withStyles(styles)(MatchPlayerSelection)
