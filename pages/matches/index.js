import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'

const Index = (props) => (
  <Layout>
    <p>Played matches</p>
    <ul>
      {props.matches.map(match => (
        <li key={match.id}>
          <div>
            {match.date}
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
