import Badge from '@material-ui/core/Badge'

const PointsBadge = ({
  hasWin,
  classes,
  difference,
  styleMatchDifference
}) =>
  <Badge
    color={hasWin ? 'primary' : 'secondary'}
    classes={{
      colorPrimary: classes.winBadge,
      colorSecondary: classes.loseBadge
    }}
    badgeContent={
      <small>
        {hasWin ? difference : - difference}
      </small>
    }
    style={styleMatchDifference}
  />

export default PointsBadge
