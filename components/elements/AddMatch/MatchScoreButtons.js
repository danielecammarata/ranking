import {
  Button,
  Grid
} from '@material-ui/core'
import { useScore } from '../../hooks/useScore'

const MatchScoreButtons = ({
  keyPrefix,
  setScoreAction,
  incrementScoreAction
}) => {
  const [score, dispatch] = useScore()

  return (
    <Grid item xs={6} sm={6}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item =>
        <Button
          key={`${keyPrefix}${item}`}
          variant="contained"
          style={{width: 'calc(33% - 6px)', margin: '3px', minWidth: 'initial'}}
          onClick={() => dispatch({type: setScoreAction, score: item})}
        >{item}</Button>
      )}
      <Button
        style={{width: 'calc(100% - 9px)', margin: '3px'}}
        variant="contained"
        onClick={() => dispatch({type: incrementScoreAction})}
      >+1</Button>
    </Grid>
  )
}

export default MatchScoreButtons
