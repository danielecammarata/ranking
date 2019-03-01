import {
  Button,
  ExpansionPanelActions
} from '@material-ui/core'

const ExpansionPanelMatchActions = ({
  canSave,
  onContinue,
  onSave,
  onNew
}) => (
  <ExpansionPanelActions>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onContinue}
    >
      Continue
    </Button>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onSave}
    >
      Save
    </Button>
    <Button
      size="small"
      color="primary"
      variant="contained"
      disabled={!canSave}
      onClick={onNew}
    >
      New
    </Button>
  </ExpansionPanelActions>
)

export default ExpansionPanelMatchActions
