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

const ExpansionPanelGoalsByRole = ({
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
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Goals by role</ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Grid container justify="space-between">
        <Grid item xs={6} sm={6}>Home Defender</Grid>
        <Grid item xs={6} sm={6}>Home Striker</Grid>
        <MatchScoreButtons
          keyPrefix="homeScoreDef"
          setScoreAction={actions.SET_HOME_DEFENDER_SCORE}
          incrementScoreAction={actions.INCREMENT_HOME_DEFENDER_SCORE}
        />
        <MatchScoreButtons
          keyPrefix="homeScoreStr"
          setScoreAction={actions.SET_HOME_STRIKER_SCORE}
          incrementScoreAction={actions.INCREMENT_HOME_STRIKER_SCORE}
        />
        <Grid item xs={6} sm={6} style={{marginTop: '20px'}}>Away Defender</Grid>
        <Grid item xs={6} sm={6} style={{marginTop: '20px'}}>Away Striker</Grid>
        <MatchScoreButtons
          keyPrefix="awayScoreDef"
          setScoreAction={actions.SET_AWAY_DEFENDER_SCORE}
          incrementScoreAction={actions.INCREMENT_AWAY_DEFENDER_SCORE}
        />
        <MatchScoreButtons
          keyPrefix="awayScoreStr"
          setScoreAction={actions.SET_AWAY_STRIKER_SCORE}
          incrementScoreAction={actions.INCREMENT_AWAY_STRIKER_SCORE}
        />
      </Grid>
    </ExpansionPanelDetails>
    <ExpansionPanelMatchActions
      onContinue={onContinue}
      onSave={onSave}
      onNew={onNew}
    />
  </ExpansionPanel>

  export default ExpansionPanelGoalsByRole
