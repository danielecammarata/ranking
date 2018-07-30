import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'

function convertDate (inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

const Index = (props) => (
  <Layout>
    <p>Played matches</p>
    <ul>
      {props.matches.map(match => (
        <li key={match.slug}>
          <div>
            <p>{match.teamHome.defender.name} + {match.teamHome.striker.name}</p>
            <span>VS</span>
            <p>{match.teamAway.defender.name} + {match.teamAway.striker.name}</p>
            <p>{match.teamHome.score} - {match.teamAway.score}</p>
            {convertDate(match.createdAt)}
          </div>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function getInitialProps() {
  const data = await getMatchesList()

  return {
    matches: data
  }
}

export default Index
