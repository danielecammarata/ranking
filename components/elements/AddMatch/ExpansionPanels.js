import React from 'react'

import ExpansionPanelGameGoals from './ExpansionPanelGameGoals'
import ExpansionPanelGoalsByRole from './ExpansionPanelGoalsByRole'
import { useScore, actions } from '../../hooks/useScore'

const ExpansionPanels = ({
  onContinue,
  onSave,
  onNew
}) => {
  const [state, dispatch] = useScore()

  return (
    <>
      <ExpansionPanelGameGoals
        isExpanded={state.panelExpanded === actions.PANEL_TEAM_GOALS_SELECT}
        onExpandChange={() => dispatch({type: actions.PANEL_TEAM_GOALS_SELECT})}
        onContinue={onContinue}
        onSave={onSave}
        onNew={onNew}
      />
      <ExpansionPanelGoalsByRole
        isExpanded={state.panelExpanded === actions.PANEL_ROLE_GOALS_SELECT}
        onExpandChange={() => dispatch({type: actions.PANEL_ROLE_GOALS_SELECT})}
        onContinue={onContinue}
        onSave={onSave}
        onNew={onNew}
      />
    </>
  )
}

export default ExpansionPanels
