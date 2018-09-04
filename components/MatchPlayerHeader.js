import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'

import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'



import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  iconContainer: {
    marginTop: 5,
    marginLeft: 8
  },
  iconTeam: {
    color: 'red'
  },
  iconDefender: {
    color: 'green'
  },
  iconStriker: {
    color: 'blue'
  },
  text: {
    width: 20
  }
})

class MatchPlayerHeader extends React.Component {
  handleScoreChange = (event, state) => {
    this.props.onScoreChange({
      selector: `${this.props.selector}${state}`,
      value: parseInt(event.target.value)
    })
  }

  render () {
    const { classes, teamLabel, enableScore, disableScore = false, scores = {} } = this.props
    return (
      <GridListTile cols={2} style={{ height: 'auto', width: '100%' }}>
        <ListSubheader component="div">
          <Grid container spacing={16}>
            <Grid item item xs={5}>
              {teamLabel}
            </Grid>
            {enableScore &&
              <React.Fragment>
                <Grid item className={classes.iconContainer} item xs={1}>
                  <PeopleIcon
                    className={classes.iconTeam}
                  />
                </Grid>
                <Grid item item xs={1}>
                  <TextField
                    id="teamgolas"
                    className={classes.text}
                    onChange={(ev) => this.handleScoreChange(ev, '')}
                    value={scores.score}
                  />
                </Grid>
                <Grid item className={classes.iconContainer} item xs={1}>
                  <PersonIcon
                    className={classes.iconDefender}
                  />
                </Grid>
                <Grid item item xs={1}>
                  <TextField
                    id="teamgolasdef"
                    className={classes.text}
                    onChange={ev => this.handleScoreChange(ev, 'Defender')}
                    value={scores.defScore}
                  />
                </Grid>
                <Grid item className={classes.iconContainer} item xs={1}>
                  <PersonIcon
                    className={classes.iconStriker}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    id="teamgolassr"
                    className={classes.text}
                    onChange={ev => this.handleScoreChange(ev, 'Striker')}
                    value={scores.strScore}
                  />
                </Grid>
              </React.Fragment>
            }
          </Grid>
        </ListSubheader>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(MatchPlayerHeader)
