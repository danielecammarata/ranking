import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import { withStyles } from '@material-ui/core/styles'

import withTitle from '../components/hoc/WithTitle'
import Layout from '../components/Layout.js'
import LoadMore from '../components/elements/LoadMore'
import ActionsHeader from '../components/blocks/ActionsHeader'
import MatchesList from '../components/blocks/MatchesList'
import { prepareMatchData } from '../components/modifiers'

import { getMatchesList } from '../lib/api/match'

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

      const matchesObj = prepareMatchData(data.matches, this.state.matchesObj)
      const matchesFetchedCount = data.matches.length
      const numMatches = data.count

      this.setState({ matchesObj, matchesFetchedCount, numMatches })
    } catch (err) {
      throw new Error(err)
    }
  }

  loadMore () {
    if (this.state.loadMoreActive !== true) {
      return
    }
    this.setState({ loadMoreActive: false })
    try {
      getMatchesList(this.state.matchesFetchedCount, elementPerPage)
        .then((newMatches) => {
          const matchesObj = prepareMatchData(newMatches.matches, this.state.matchesObj)
          const matchesFetchedCount = newMatches.matches.length + this.state.matchesFetchedCount
          this.setState({ matchesObj, matchesFetchedCount, loadMoreActive: this.state.numMatches > matchesFetchedCount})
          return matchesObj
        })
        .catch(reason => {
          throw new Error(reason)
        })
    } catch (err) {
      throw new Error(err)
    }
  }

  render () {
    const { matchesObj } = this.state
    return (
      <Layout>
        <Grid container spacing={16}>
          <ActionsHeader />
        </Grid>
        {/* New grouped matches list */}
        <GridList style={{margin: '0 auto', maxWidth: '768px'}}>
          {Object.keys(matchesObj).map(matchKey =>
            <MatchesList
              label={matchKey}
              matches={matchesObj[matchKey].matches}
              classes={this.props.classes}
            />
          )}
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
