import React from 'react'
import TextField from '@material-ui/core/TextField'

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
      const data = await getUsersList()
      this.setState({ users: data.users })
    } catch (err) {
      console.log(err)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const users = await addNewUser()
  
    this.setState({ users, userAdded: true })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    return (
      <Layout>
        <form autoComplete="off">
          <TextField
            id="name"
            label="name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
        </form>
        <p>This users new</p>
        <form onSubmit={this.onSubmit}>
          <button variant="raised" type="submit">
            Add
          </button>
        </form>
      </Layout>
    )
  }
}

export default AddUser