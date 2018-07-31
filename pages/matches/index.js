import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

function convertDate (inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

const Index = (props) => (
  <Layout>
    <p>Played matches</p>
    <GridList>
      {props.matches.map(match => (
        <GridListTile style={{height:'calc((50vw * 3 / 4) + 70px'}} key={match.slug}>
          <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamHome.defender.avatarUrl} alt={match.teamHome.defender.name} />
          <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamHome.striker.avatarUrl} alt={match.teamHome.striker.name} />
          <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamAway.defender.avatarUrl} alt={match.teamAway.defender.name} />
          <img style={{float:'left', height:'calc(25vw * 3 / 4)', width: '50%'}} src={match.teamAway.striker.avatarUrl} alt={match.teamAway.striker.name} />
          <img/>
          <GridListTileBar
            title={<span>{match.teamHome.defender.name}, {match.teamHome.striker.name} {match.teamHome.score} - {match.teamAway.score} {match.teamAway.defender.name}, {match.teamAway.striker.name}</span>}
            subtitle={<span>{match.createdAt}</span>}
          />
        </GridListTile>
      ))}
    </GridList>

  </Layout>
)

Index.getInitialProps = async function getInitialProps() {
  const data = await getMatchesList()

  return {
    matches: data
  }
}

export default Index
