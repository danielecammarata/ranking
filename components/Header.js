import Link from 'next/link'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import getRootUrl from '../lib/api/getRootUrl'
import { styleToolbar } from '../lib/SharedStyles'
import indigo from '@material-ui/core/colors/indigo'

const styles = {
  link: {
    color: indigo[700],
    marginRight: 15,
    textDecoration: 'none',
    '&:visited': {
      color: indigo[900]
    },
    '&:hover': {
      color: indigo[500],
    }
  }
}

const linkStyle = {
  marginRight: 15,
  textDecoration: 'none'
}

const Header = ({classes}) => (
  <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      top: '0px',
      transition: 'top 0.5s ease-in',
    }}
  >
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item sm={6} xs={1} style={{ textAlign: 'left' }}>
          <Link href="/">
            <a style={linkStyle}>
              <img src={`${getRootUrl()}/img/logo.png`} alt="logo" />
            </a>
          </Link>
        </Grid>
        <Grid item sm={4} xs={9} style={{ textAlign: 'right' }}>
          <Link href="/matches">
            <a className={classes.link}>Matches</a>
          </Link>
          <Link href="/matches/new">
            <a className={classes.link}>New Match</a>
          </Link>
          <Link href="/matches/live">
            <a className={classes.link}>Live Match</a>
          </Link>
          <Link href="/users">
            <a className={classes.link}>Users</a>
          </Link>
          <Link href="/users/new">
            <a className={classes.link}>New User</a>
          </Link>
          <Link href="/about">
            <a className={classes.link}>About</a>
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </div>
)

export default withStyles(styles)(Header)