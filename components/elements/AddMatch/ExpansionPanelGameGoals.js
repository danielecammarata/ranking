import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MatchScoreButtons from './MatchScoreButtons'
import ExpansionPanelMatchActions from './ExpansionPanelMatchActions'

import { actions } from '../../hooks/useScore'

const ExpansionPanelGameGoals = ({
  isExpanded,
  onExpandChange,
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
          setScoreAction={actions.SET_HOME_SCORE}
          incrementScoreAction={actions.INCREMENT_HOME_SCORE}
        />
        <MatchScoreButtons
          keyPrefix="awayScore"
          setScoreAction={actions.SET_AWAY_SCORE}
          incrementScoreAction={actions.INCREMENT_AWAY_SCORE}
        />
      </Grid>
    </ExpansionPanelDetails>
    <ExpansionPanelMatchActions
      onContinue={onContinue}
      onSave={onSave}
      onNew={onNew}
    />
  </ExpansionPanel>

  export default ExpansionPanelGameGoals
