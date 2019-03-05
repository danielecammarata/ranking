import {
  Divider,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core'
import MatchTeamPointsBadge from '../../MatchTeamPointsBadge'
import TeamScore from '../../elements/TeamScore'
import PlayerChip from '../../elements/PlayerChip'
import BadgeIcon from '../../badge'

const styleMatchTile = {
  margin: '20px auto',
  height: 'auto',
  width: '100%',
}

const styleMatchDifference = {
  left: '35%',
  position: 'absolute',
  top: '35px',
  zIndex: 1,
}

const styleTeamTile = position => ({
  height: '78px',
  textAlign: position ? position : 'left',
})

const styleTeamPlayer = position => ({
  flexDirection: position === 'right' ? 'row-reverse' : 'initial',
  justifyContent: 'flex-start',
  marginBottom: '5px',
  padding: '0 5px',
  width: '100%'
})

const MatchTile = ({
  match,
  classes
}) =>
  <GridListTile style={styleMatchTile} key={match.slug}>
    <GridList style={{lineHeight: '13px'}}>
      <GridListTile style={styleTeamTile('left')} className={classes.styleTeamTile}>
        <PlayerChip
          avatarUrl={match.teamHome.defender.avatarUrl}
          name={match.teamHome.defender.name}
          playerSide="left"
        />
        <PlayerChip
          avatarUrl={match.teamHome.striker.avatarUrl}
          name={match.teamHome.striker.name}
          playerSide="left"
        />
        <MatchTeamPointsBadge
          hasWin={match.teamHome.score > match.teamAway.score}
          difference={match.difference}
          styleMatchDifference={styleMatchDifference}
        />
      </GridListTile>
      <TeamScore
        matchId={match._id}
        score={match.teamHome.score}
        defScore={match.teamHome.defScore}
        strScore={match.teamHome.strScore}
        teamPlace="home"
      />
      <GridListTile style={styleTeamTile('right')} className={classes.styleTeamTileLast}>
        <PlayerChip
          avatarUrl={match.teamAway.defender.avatarUrl}
          name={match.teamAway.defender.name}
          playerSide="right"
        />
        <PlayerChip
          avatarUrl={match.teamAway.striker.avatarUrl}
          name={match.teamAway.striker.name}
          playerSide="right"
        />
        <MatchTeamPointsBadge
          hasWin={match.teamAway.score > match.teamHome.score}
          difference={match.difference}
          styleMatchDifference={styleMatchDifference}
          isAway
        />
      </GridListTile>
      <TeamScore
        matchId={match._id}
        score={match.teamAway.score}
        defScore={match.teamAway.defScore}
        strScore={match.teamAway.strScore}
        teamPlace="away"
      />
    </GridList>
    <div className={classes.badgesList}>
      {match.badges.map((badge, index) => (
        <BadgeIcon
          key={`badge-${index}`}
          type={badge}
        />
      ))}
    </div>
  </GridListTile>

const MatchesList = ({
  label,
  matches,
  classes
}) =>
  <GridListTile style={styleMatchTile} key={label}>
    <Typography>
      {label}
    </Typography>
    <Divider />
    <GridList style={{margin: '0 auto', maxWidth: '100%'}}>
      {matches.map(match => (
        <MatchTile
          key={match._id}
          match={match}
          classes={classes}
        />
      ))}
    </GridList>
  </GridListTile>

  export default MatchesList
