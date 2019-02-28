import {
  Avatar,
  Chip,
  Divider,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core'
import MatchTeamPointsBadge from '../../MatchTeamPointsBadge'
import TeamScore from '../../elements/TeamScore'
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
        <Chip
          avatar={<Avatar src={match.teamHome.defender.avatarUrl} />}
          label={match.teamHome.defender.name}
          style={styleTeamPlayer('left')}
        />
        <Chip
          avatar={<Avatar src={match.teamHome.striker.avatarUrl} />}
          label={match.teamHome.striker.name}
          style={styleTeamPlayer('left')}
        />
        <MatchTeamPointsBadge
          hasWin={match.teamHome.score > match.teamAway.score}
          classes={classes}
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
        <Chip
          avatar={<Avatar src={match.teamAway.defender.avatarUrl} />}
          classes={{label: classes.chipsLabel}}
          label={match.teamAway.defender.name}
          style={styleTeamPlayer('right')}
        />
        <Chip
          avatar={<Avatar src={match.teamAway.striker.avatarUrl} />}
          label={match.teamAway.striker.name}
          style={styleTeamPlayer('right')}
        />
        <MatchTeamPointsBadge
          hasWin={match.teamAway.score > match.teamHome.score}
          classes={classes}
          difference={match.difference}
          styleMatchDifference={styleMatchDifference}
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
          match={match}
          classes={classes}
        />
      ))}
    </GridList>
  </GridListTile>

  export default MatchesList
