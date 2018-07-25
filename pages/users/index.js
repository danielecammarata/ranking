import fetch from 'isomorphic-unfetch'
import Layout from '../../components/Layout.js'
import { getUsersList } from '../../lib/api/users'

const Index = (props) => (
  <Layout>
    <h1>Players</h1>
    <ul>
      {props.users.map(user => (
        <li key={user.name}>
          {user.name} | {user.points}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function getInitialProps() {
  const data = await getUsersList()

  return {
    users: data
  }
}

export default Index
