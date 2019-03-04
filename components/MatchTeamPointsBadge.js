import { withStyles, styled } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import Badge from '@material-ui/core/Badge'
import { SoccerIcon } from './IconComponents'

const styleMatchDifference = isAway => ({
  left: isAway ? '20px' : null,
  right: !isAway ? '20px' : null,
  position: 'absolute',
  top: '25px',
  zIndex: 1,
})

const styles = {
  winBadge: {
    backgroundColor: green[500],
    fontSize: '13px',
    fontWeight: '700'
  },
  loseBadge: {
    backgroundColor: red[500],
    colorPrimary: red[500],
    fontSize: '13px',
    fontWeight: '700'
  },
  homeBadge: {
    top: '50%'
  },
  awayBadge: {
    right: '24px',
    top: '50%'
  }
}

const PointsBadge = ({
  classes,
  hasWin,
  difference,
  isAway
}) =>
  <Badge
    color={hasWin ? 'primary' : 'secondary'}
    classes={{
      colorPrimary: classes.winBadge,
      colorSecondary: classes.loseBadge,
      badge: isAway ? classes.awayBadge : classes.homeBadge
    }}
    badgeContent={
      <small>
        {hasWin ? difference : - difference}
      </small>
    }
    style={styleMatchDifference(isAway)}
  >
    <SoccerIcon />
  </Badge>

export default withStyles(styles)(PointsBadge)
