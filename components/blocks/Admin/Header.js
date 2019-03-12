import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from "@material-ui/core"
import blue from '@material-ui/core/colors/blue'

const styles = {
  root: {
    flexGrow: 1
  }
}

const AdminHeader = ({
  classes
}) =>
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Matches</Button>
        <Button color="inherit">Players</Button>
      </Toolbar>
    </AppBar>
  </div>

export default withStyles(styles)(AdminHeader)
