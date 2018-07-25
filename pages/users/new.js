import React from 'react'
import Layout from '../../components/Layout.js'
import { addNewUser, getUsersList } from '../../lib/api/users'


class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || [],
      userAdded: false
    }
  }

  async componentDidMount() {
    try {
      const users = await getUsersList()
      this.setState({ users })
    } catch (err) {
      console.log(err)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const users = await addNewUser()
  
    this.setState({ users, userAdded: true })
  }

  render() {
    return (
      <Layout>
        <p>This users new</p>
        <form onSubmit={this.onSubmit}>
          <button variant="raised" type="submit">
            Add
          </button>
        </form>
        <h2>Players</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.name}>
              {user.name} | {user.points}
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default AddUser