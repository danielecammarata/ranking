import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import GithubIcon from './IconComponents/GithubIcon'

import { styleToolbar } from '../lib/SharedStyles'

const styles = theme => ({
  icon: {
    fontSize: 35
  }
})

const Footer = (props) => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <span>© 2018 Scoreza - Eat less play more</span>
        <a
          href="https://github.com/danielecammarata/ranking"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon
            className={props.classes.icon}
            color="secondary"
          />
        </a>
      </Grid>
    </Toolbar>
  </div>
)

export default withStyles(styles)(Footer)
