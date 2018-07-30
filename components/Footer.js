import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

import { styleToolbar } from '../lib/SharedStyles'

const Footer = () => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <span>© 2018 Scoreza</span>
        <a
          style={{ padding: '0px 20px' }}
          href="https://github.com/danielecammarata/ranking"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Grid>
    </Toolbar>
  </div>
)

export default Footer
