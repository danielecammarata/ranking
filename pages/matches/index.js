import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Button from '@material-ui/core/Button'

import { styleFormButton } from '../../lib/SharedStyles.js'

class IndexMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadMoreActive: true,
      matches: []
    }
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount () {
    try {
      if(this.state.matches.length <= 0){
        const data = await getMatchesList(0, 1)
        this.setState({ matches: data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  loadMore () {
    if(this.state.loadMoreActive === true) {
      this.setState({ loadMoreActive: false })
      try {
        getMatchesList(this.state.matches.length, 1).then((newMatches) => {
          const matches = this.state.matches.concat(newMatches)
          this.setState({loadMoreActive: (matches.length != this.state.matches.length), matches: matches })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  convertDate (inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  render () {
    return <Layout>
      <p>Played matches</p>
      <GridList>
        {this.state.matches && this.state.matches.map(match => (
          <GridListTile style={{height:'calc((50vw * 3 / 4) + 70px'}} key={match.slug}>
            <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamHome.defender.avatarUrl} alt={match.teamHome.defender.name} />
            <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamHome.striker.avatarUrl} alt={match.teamHome.striker.name} />
            <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamAway.defender.avatarUrl} alt={match.teamAway.defender.name} />
            <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamAway.striker.avatarUrl} alt={match.teamAway.striker.name} />
            <GridListTileBar
              title={<span>{match.teamHome.defender.name}, {match.teamHome.striker.name} {match.teamHome.score} - {match.teamAway.score} {match.teamAway.defender.name}, {match.teamAway.striker.name}</span>}
              subtitle={<span>{this.convertDate(match.createdAt)}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
      <Button
        variant="contained"
        style={styleFormButton}
        type="button"
        onClick={this.loadMore}
        disabled={!this.state.loadMoreActive}
      >
        Load more
      </Button>
    </Layout>
  }
}
export default IndexMatch
