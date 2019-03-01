import {
  Button,
  Grid
} from '@material-ui/core'

const MatchScoreButtons = ({
  keyPrefix,
  onScorePlayerSelection,
  onScorePlayerSelectionAddOne
}) =>
  <Grid item xs={6} sm={6}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item =>
      <Button
        key={`${keyPrefix}${item}`}
        variant="contained"
        style={{width: 'calc(33% - 6px)', margin: '3px', minWidth: 'initial'}}
        onClick={onScorePlayerSelection(item)}
      >{item}</Button>
    )}
    <Button
      style={{width: 'calc(100% - 9px)', margin: '3px'}}
      variant="contained"
      onClick={onScorePlayerSelectionAddOne}
    >+1</Button>
  </Grid>

export default MatchScoreButtons
