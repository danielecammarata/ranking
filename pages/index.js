import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../components/Layout.js'
import LoadMore from '../components/elements/LoadMore'
import HeadMeta from '../components/elements/HeadMeta'
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
      loadMoreActive: props.numMatches > props.matchesFetchedCount,
      matchesObj: props.matchesObj,
      matchesFetchedCount: props.matchesFetchedCount,
      numMatches: props.numMatches
    }
    this.loadMore = this.loadMore.bind(this)
  }

  static async getInitialProps() {
    const data = await getMatchesList(0, elementPerPage, true)
    const matchesObj = prepareMatchData(data.matches, {})
    const matchesFetchedCount = data.matches.length
    const numMatches = data.count
    return {
      matchesObj,
      matchesFetchedCount,
      numMatches
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
        <HeadMeta
          title="Home | Scoreza"
        />
        <Grid container spacing={16}>
          <ActionsHeader />
        </Grid>
        {/* New grouped matches list */}
        <GridList style={{margin: '0 auto', maxWidth: '768px'}}>
          {Object.keys(matchesObj).map(matchKey =>
            <MatchesList
              key={matchKey}
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

export default withStyles(styles)(Index)
