import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MatchScoreButtons from './MatchScoreButtons'
import ExpansionPanelMatchActions from './ExpansionPanelMatchActions'

const ExpansionPanelGoalsByRole = ({
  isExpanded,
  onExpandChange,
  onScoreHomeDefSelection,
  onScoreHomeDefSelectionAddOne,
  onScoreHomeStrSelection,
  onScoreHomeStrSelectionAddOne,
  onScoreAwayDefSelection,
  onScoreAwayDefSelectionAddOne,
  onScoreAwayStrSelection,
  onScoreAwayStrSelectionAddOne,
  canSave,
  onContinue,
  onSave,
  onNew
}) =>
  <ExpansionPanel
    expanded={isExpanded}
    onChange={onExpandChange}
  >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Goals by role</ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Grid container justify="space-between">
        <Grid item xs={6} sm={6}>Home Defender</Grid>
        <Grid item xs={6} sm={6}>Home Striker</Grid>
        <MatchScoreButtons
          keyPrefix="homeScoreDef"
          onScorePlayerSelection={onScoreHomeDefSelection}
          onScorePlayerSelectionAddOne={onScoreHomeDefSelectionAddOne}
        />
        <MatchScoreButtons
          keyPrefix="homeScoreStr"
          onScorePlayerSelection={onScoreHomeStrSelection}
          onScorePlayerSelectionAddOne={onScoreHomeStrSelectionAddOne}
        />
        <Grid item xs={6} sm={6} style={{marginTop: '20px'}}>Away Defender</Grid>
        <Grid item xs={6} sm={6} style={{marginTop: '20px'}}>Away Striker</Grid>
        <MatchScoreButtons
          keyPrefix="awayScoreDef"
          onScorePlayerSelection={onScoreAwayDefSelection}
          onScorePlayerSelectionAddOne={onScoreAwayDefSelectionAddOne}
        />
        <MatchScoreButtons
          keyPrefix="awayScoreStr"
          onScorePlayerSelection={onScoreAwayStrSelection}
          onScorePlayerSelectionAddOne={onScoreAwayStrSelectionAddOne}
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

  export default ExpansionPanelGoalsByRole
