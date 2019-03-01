import {
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch
  } from '@material-ui/core'

const RankingActionsHeader = ({
    classes,
    onShowInactive,
    isSortOpen,
    onSortOpen,
    onSortClose,
    onSortChange,
    sortingValue
  }) =>
    <FormGroup row>
      <div className={classes.formLabel}>
        <FormControlLabel
          control={
            <Switch
              value="checkedB"
              color="primary"
              onChange={onShowInactive}
            />
          }
          label="Show inactive users"
        />
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Sort by</InputLabel>
        <Select
          open={isSortOpen}
          onClose={onSortClose}
          onOpen={onSortOpen}
          onChange={onSortChange}
          inputProps={{
            name: 'sortingValue',
            id: 'demo-controlled-open-select',
          }}
          value={sortingValue}
          className={classes.formSelect}
        >
          <MenuItem value="points">Points</MenuItem>
          <MenuItem value="goals">Goals</MenuItem>
          <MenuItem value="conceded">Goals conceded</MenuItem>
          <MenuItem value="played">Match Played</MenuItem>
        </Select>
      </FormControl>
    </FormGroup>

export default RankingActionsHeader
