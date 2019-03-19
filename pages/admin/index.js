import { withStyles } from '@material-ui/core/styles'
import { AdminHeader } from '../../components/blocks/Admin';
import { Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
})

const AdminHome = ({
  classes
}) =>
  <>
    <AdminHeader />
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        Matches
      </Typography>
      <Typography component="p">
        In the matches section it's possible to recalculate the ranking using the button in the upper menu:
      </Typography>
      <img src="/img/admin/recalcbtn.png" height='75' />
      <Typography component="p">
        In the matches list it's possible to handle specific actions, using the <DeleteIcon /> icon the match can be removed and automagically the ranking is recalculated starting from the deleted match.
        It's also possible to force a ranking calculation from a specific match using the <UpdateIcon /> icon.
      </Typography>
    </Paper>
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        Players
      </Typography>
      <Typography component="p">
        Not too much to do right now, just the playes list.
      </Typography>
    </Paper>
  </>

export default withStyles(styles)(AdminHome)
