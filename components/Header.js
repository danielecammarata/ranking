import Link from 'next/link'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

import { styleToolbar, styleRaisedButton } from '../lib/SharedStyles'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
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
            <a style={linkStyle}>Belliga</a>
          </Link>
        </Grid>
        <Grid item sm={4} xs={9} style={{ textAlign: 'right' }}>
          <Link href="/matches">
            <a style={linkStyle}>Matches</a>
          </Link>
          <Link href="/matches/new">
            <a style={linkStyle}>New Match</a>
          </Link>
          <Link href="/users">
            <a style={linkStyle}>Users</a>
          </Link>
          <Link href="/users/new">
            <a style={linkStyle}>New User</a>
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </div>
)

export default Header