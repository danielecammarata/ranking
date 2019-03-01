import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MatchScoreButtons from './MatchScoreButtons'
import ExpansionPanelMatchActions from './ExpansionPanelMatchActions'

const ExpansionPanelGameGoals = ({
  isExpanded,
  onExpandChange,
  onScoreHomeSelection,
  onScoreHomeSelectionAddOne,
  onScoreAwaySelection,
  onScoreAwaySelectionAddOne,
  canSave,
  onContinue,
  onSave,
  onNew
}) =>
  <ExpansionPanel
    expanded={isExpanded}
    onChange={onExpandChange}
  >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Game Goals</ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Grid container justify="space-between">
        <Grid item xs={6} sm={6}>Home</Grid>
        <Grid item xs={6} sm={6}>Away</Grid>
        <MatchScoreButtons
          keyPrefix="homeScore"
          onScorePlayerSelection={onScoreHomeSelection}
          onScorePlayerSelectionAddOne={onScoreHomeSelectionAddOne}
        />
        <MatchScoreButtons
          keyPrefix="awayScore"
          onScorePlayerSelection={onScoreAwaySelection}
          onScorePlayerSelectionAddOne={onScoreAwaySelectionAddOne}
        />
      </Grid>
    </ExpansionPanelDetails>
    <ExpansionPanelMatchActions
      canSave={canSave}
      onContinue={onContinue}
      onSave={onSave}
      onNew={onNew}
    />
  </ExpansionPanel>

  export default ExpansionPanelGameGoals
