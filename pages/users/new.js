import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Layout from '../../components/Layout.js'
import { addNewUser } from '../../lib/api/users'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userAdded: false,
      name: '',
      avatarUrl: ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    
    const users = await addNewUser({
      name: this.state.name,
      avatarUrl: this.state.avatarUrl
    })
  
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
        <h1 style={styleH1}>Add new user</h1>
        <Divider />
        <form 
          autoComplete="off"
          style={styleForm}
          onSubmit={this.onSubmit}
        >
          <TextField
            style={styleTextField}
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            required
          />
          <TextField
            style={styleTextField}
            id="avatarUrl"
            label="Avatar URL"
            value={this.state.avatarUrl}
            onChange={this.handleChange('avatarUrl')}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            style={styleRaisedButton}
            type="submit"
          >
            Add User
          </Button>
        </form>
      </Layout>
    )
  }
}

export default AddUser