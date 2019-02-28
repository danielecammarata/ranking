import {
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'

const PlayerRoleSelection = ({
  role,
  handleChange,
  classes
}) =>
  <RadioGroup
    aria-label="role"
    className={classes.radioGroup}
    name="role2"
    value={role || 'jolly'}
    onChange={handleChange('role')}
    >
    <FormControlLabel
      className={classes.radioLabel}
      value='defender'
      control={<Radio color="primary" />}
      label="Defender"
    />
    <FormControlLabel
      className={classes.radioLabel}
      value='striker'
      control={<Radio color="primary" />}
      label="Striker"
    />
    <FormControlLabel
      className={classes.radioLabel}
      value='jolly'
      control={<Radio color="primary" />}
      label="Jolly"
    />
    <FormControlLabel
      className={classes.radioLabel}
      value='challenge'
      control={<Radio color="primary" />}
      label="Challenge"
    />
  </RadioGroup>

export default PlayerRoleSelection
