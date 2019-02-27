import withTitle from '../components/hoc/WithTitle'
import BadgeIcon from '../components/badge'

import Link from 'next/link'
import Layout from '../components/Layout.js'
import { getMatchesList } from '../lib/api/match'
import {
  styleMatchDifference,
  styleMatchTile,
  styleTeamTile,
  styleTeamPlayer
} from '../lib/ListOfMatches.js'
import { SoccerFieldIcon, TrophyIcon } from '../components/IconComponents'

import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { Divider, Typography, Fab } from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import { convertDate } from '../components/modifiers'
import LoadMore from '../components/elements/LoadMore'
import TeamScore from '../components/elements/TeamScore'

const elementPerPage = 6

const styles = theme => ({
  chipsLabel: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  winBadge: {
    backgroundColor: green[500],
    fontSize: '13px',
    fontWeight: '700',
  },
  loseBadge: {
    backgroundColor: red[500],
    colorPrimary: red[500],
    fontSize: '13px',
    fontWeight: '700',
    left: '30px',
  },
  styleTeamTile: {
    width:'calc(100% - 60px) !important' ,
    [theme.breakpoints.up('sm')]: {
      width:'calc(50% - 60px) !important',
    }
  },
  styleTeamTileLast: {
    width:'calc(100% - 60px) !important' ,
    [theme.breakpoints.up('sm')]: {
      width:'calc(50% - 60px) !important',
      order: '2',
    }
  },
  badgesList: {
    textAlign: 'center'
  }
})

const differenceTile = (hasWin, classes, difference, styleMatchDifference) =>
  <Badge
    color={hasWin ? 'primary' : 'secondary'}
    classes={{
      colorPrimary: classes.winBadge,
      colorSecondary: classes.loseBadge
    }}
    badgeContent={<small>{hasWin ? difference : - difference}</small>}
    style={styleMatchDifference}
  />

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadMoreActive: true,
      matchesObj: {},
      matchesFetchedCount: 0,
      numMatches: 0
    }
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount () {
    try {
      const data = await getMatchesList(0, elementPerPage, true)

      const matchesObj = this.prepareMatchData(data.matches)
      const matchesFetchedCount = data.matches.length
      const numMatches = data.count

      this.setState({ matchesObj, matchesFetchedCount, numMatches })
    } catch (err) {
      console.log(err)
    }
  }

  loadMore () {
    if(this.state.loadMoreActive === true) {
      this.setState({ loadMoreActive: false })
      try {
        getMatchesList(this.state.matchesFetchedCount, elementPerPage).then((newMatches) => {
          const matchesObj = this.prepareMatchData(newMatches.matches)
          const matchesFetchedCount = newMatches.matches.length + this.state.matchesFetchedCount
          this.setState({ matchesObj, matchesFetchedCount, loadMoreActive: this.state.numMatches > matchesFetchedCount})
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  /**
   * Group match data by createdAt date
   * @param {array} data - matches array
   * @returns {object} grouped matches
   */
  prepareMatchData (data) {
    const matches = this.state.matchesObj
    data.forEach(item => {
      const currDate = convertDate(item.createdAt)
      if (currDate in matches) {
        matches[currDate].matches.push(item)
      } else {
        matches[currDate] = {
          matches: [item]
        }
      }
    })

    return matches
  }

  differenceTile = (hasWin, classes, difference, styleMatchDifference) => (
    <Badge
      color={hasWin ? 'primary' : 'secondary'}
      classes={{
        colorPrimary: classes.winBadge,
        colorSecondary: classes.loseBadge
      }}
      badgeContent={<small>{hasWin ? difference : - difference}</small>}
      style={styleMatchDifference}
    />
  )

  matchTile = (label, matches) => (
    <GridListTile style={styleMatchTile} key={label}>
      <Typography>
        {label}
      </Typography>
      <Divider />
      <GridList style={{margin: '0 auto', maxWidth: '100%'}}>
        {matches.map(match => (
          <GridListTile style={styleMatchTile} key={match.slug}>
            <GridList style={{lineHeight: '13px'}}>
              <GridListTile style={styleTeamTile('left')} className={this.props.classes.styleTeamTile}>
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
                {
                  this.differenceTile(
                    (match.teamHome.score > match.teamAway.score),
                    this.props.classes,
                    match.difference,
                    styleMatchDifference
                  )
                }
              </GridListTile>
              <TeamScore
                matchId={match._id}
                score={match.teamHome.score}
                defScore={match.teamHome.defScore}
                strScore={match.teamHome.strScore}
                teamPlace="home"
              />
              <GridListTile style={styleTeamTile('right')} className={this.props.classes.styleTeamTileLast}>
                <Chip
                  avatar={<Avatar src={match.teamAway.defender.avatarUrl} />}
                  classes={{label: this.props.classes.chipsLabel}}
                  label={match.teamAway.defender.name}
                  style={styleTeamPlayer('right')}
                />
                <Chip
                  avatar={<Avatar src={match.teamAway.striker.avatarUrl} />}
                  label={match.teamAway.striker.name}
                  style={styleTeamPlayer('right')}
                />
                {
                  this.differenceTile(
                    (match.teamAway.score > match.teamHome.score),
                    this.props.classes,
                    match.difference,
                    styleMatchDifference
                  )
                }
              </GridListTile>
              <TeamScore
                matchId={match._id}
                score={match.teamAway.score}
                defScore={match.teamAway.defScore}
                strScore={match.teamAway.strScore}
                teamPlace="away"
              />
            </GridList>
            <div className={this.props.classes.badgesList}>
              {match.badges.map(badge => (
                <BadgeIcon type={badge}/>
              ))}
            </div>
          </GridListTile>
        ))}
      </GridList>
    </GridListTile>
  )

  render () {
    const { matchesObj } = this.state
    return (
      <Layout>
        <Grid container spacing={16}>
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={8} sm={6}>
              <Link href="/users">
                <Fab
                  variant="extended"
                  aria-label="Ranking"
                  style={{
                    width: 200
                  }}
                >
                  <TrophyIcon style={{marginRight:'10px'}}/>
                  Ranking
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={8} sm={4}>
              <Link href="/matches/fast">
                <Fab
                  variant="extended"
                  aria-label="Ranking"
                  style={{
                    width: 200
                  }}
                >
                  <SoccerFieldIcon style={{marginRight:'10px'}}/>
                  New Match
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        {/* New grouped matches list */}
        <GridList style={{margin: '0 auto', maxWidth: '768px'}}>
          {Object.keys(matchesObj).map(matchKey => (
            this.matchTile(matchKey,  matchesObj[matchKey].matches)
          ))}
        </GridList>
        <LoadMore
          loadMoreActive={this.state.loadMoreActive}
          loadMore={this.loadMore}
        />
      </Layout>
    )
  }
}

export default withTitle('Home | Scoreza')(withStyles(styles)(Index))
