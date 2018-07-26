import fetch from 'isomorphic-unfetch'
import Layout from '../../components/Layout.js'
import { getUsersList, deleteUser } from '../../lib/api/users'

class IndexUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || [],
      userDeleted: false
    }
  }

  async componentDidMount() {
    try {
      const data = await getUsersList()
      this.setState({ users: data })
    } catch (err) {
      console.log(err)
    }
  }

  async removeUser (user, e) {
    e.preventDefault()
    console.log(user)
    const removedUser = await deleteUser(user._id)
    const localUserList = this.state.users.filter( el => el._id !== removedUser._id )
    this.setState({ users: localUserList, userDeleted: true })
  }

  render() {
    return (
      <Layout>
        <h1>Players</h1>
        <ul>
          {this.state.users && this.state.users.map(user => (
            <li key={user.slug}>
              <p>{user.name} | {user.points}</p><button variant="raised" onClick={(e) => this.removeUser(user, e)}>X</button>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }

  
}
export default IndexUser
