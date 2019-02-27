import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'

import Layout from '../../components/Layout.js'
import PlayerRoleSelection from '../../components/elements/PlayerRoleSelection'

import { addNewUser } from '../../lib/api/users.js'
import { styleTextField, styleFormButton } from '../../lib/SharedStyles.js'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  radioLegend: {
    color: '#000',
    fontSize: '15px',
    marginBottom: '10px',
    marginTop: '30px',
  },
  radioLabel: {
    maxHeight: '36px',
  },
  multilineText: {
    width: '100%',
    '& > div > div': {
      minHeight: '100px'
    }
  }
})

class AddUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userAdded: false,
      name: '',
      avatarUrl: '',
      description: '',
      role: 'jolly',
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const users = await addNewUser({
      name: this.state.name,
      avatarUrl: this.state.avatarUrl,
      description: this.state.description,
      role: this.state.role,
    })

    Router.push('/users')

    this.setState({users, userAdded: true})
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render () {
    return (
      <Layout>
        <form
          autoComplete="off"
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
          <FormLabel className={this.props.classes.radioLegend} component="legend">Main role</FormLabel>
          <PlayerRoleSelection
            classes={this.props.classes}
            role={this.state.role}
            handleChange={this.handleChange}
          />
          <TextField
            className={this.props.classes.multilineText}
            id="description"
            label="Description"
            value={this.state.description}
            multiline
            onChange={this.handleChange('description')}
            margin="normal"
          />
          <Button
            variant="contained"
            style={styleFormButton}
            type="submit"
          >
            Add User
          </Button>
        </form>
      </Layout>
    )
  }
}

export default withStyles(styles)(AddUser)
