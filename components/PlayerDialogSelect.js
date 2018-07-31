import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

class PlayerDialogSelect extends React.Component {
  state = {
    player: {
      name: ''
    }
  }

  handleChange = event => {
    this.setState({ player: event.target.value })
  }

  playerSelected = () => {
    this.props.playerSelected(this.state.player)
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.open}
          onClose={this.toggleDialog}
        >
          <DialogTitle>Select Player</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="player">Select</InputLabel>
                <Select
                  value={this.state.player.name}
                  onChange={this.handleChange}
                  input={<Input id="player" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    this.props.playersList.map(item => <MenuItem value={item}>{item.name}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.playerSelected} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

PlayerDialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  playerSelected: PropTypes.func.isRequired,
  playersList: PropTypes.array.isRequired
}

export default withStyles(styles)(PlayerDialogSelect)
