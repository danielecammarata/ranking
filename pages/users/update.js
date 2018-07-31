import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Layout from '../../components/Layout.js'
import { getUsersBySlug, updateUser } from '../../lib/api/users'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

class UpdateUser extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      slug: props.url.query.slug,
      name: props.url.query.slug,
      avatarUrl: props.avatarUrl
    }
  }

  async componentDidMount() {
    try {
      const data = await getUsersBySlug(this.state.slug)
      this.setState({
        name: data.name,
        avatarUrl: data.avatarUrl
      })
    } catch (err) {
      console.log(err)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const users = await updateUser({
      slug: this.state.slug,
      name: this.state.name,
      avatarUrl: this.state.avatarUrl
    })

    Router.push('/users')
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    return (
      <Layout>
        <h1 style={styleH1}>Modify user</h1>
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
            Modify
          </Button>
        </form>
      </Layout>
    )
  }
}

export default UpdateUser
