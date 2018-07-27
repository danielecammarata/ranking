import React from 'react'
import Router from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/next/router'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Layout from '../../components/Layout.js'
import { addNewUser } from '../../lib/api/users.js'
import { styleH1, styleForm, styleTextField, styleFormTitle, styleFormButton } from '../../lib/SharedStyles.js'
import { newUser } from '../../lib/Layouts.js'

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

    Router.push('/users')
  
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
        <div>
          <h1 style={styleFormTitle}>ADD NEW USER</h1>
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
              style={styleFormButton}
              type="submit"
            >
              Add User
            </Button>
          </form>
        </div>
      </Layout>
    )
  }
}

export default AddUser