import {
  Button,
  ExpansionPanelActions
} from '@material-ui/core'
import { useScore } from '../../hooks/useScore';

const ExpansionPanelMatchActions = ({
  onContinue,
  onSave,
  onNew
}) => {
  const [state] = useScore()
  return (
    <ExpansionPanelActions>
      <Button
        size="small"
        color="primary"
        variant="contained"
        disabled={!state.scoreReady}
        onClick={onContinue}
      >
        Continue
      </Button>
      <Button
        size="small"
        color="primary"
        variant="contained"
        disabled={!state.scoreReady}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        size="small"
        color="primary"
        variant="contained"
        disabled={!state.scoreReady}
        onClick={onNew}
      >
        New
      </Button>
    </ExpansionPanelActions>
  )
}

export default ExpansionPanelMatchActions
