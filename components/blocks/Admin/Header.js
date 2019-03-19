import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from "@material-ui/core"
import blue from '@material-ui/core/colors/blue'
import Logo from './Logo';

const styles = {
  root: {
    flexGrow: 1
  }
}

const AdminHeader = ({
  classes,
  children
}) =>
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <Link href="/admin">
          <Button color="inherit">
            Home
          </Button>
        </Link>
        <Link href="/admin/matches">
          <Button color="inherit">
            Matches
          </Button>
        </Link>
        <Link href="/admin/players">
          <Button color="inherit">Players</Button>
        </Link>
        {children}
      </Toolbar>
    </AppBar>
  </div>

export default withStyles(styles)(AdminHeader)
