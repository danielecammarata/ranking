import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import { SoccerIcon } from '../../components/IconComponents'
import ListIcon from '@material-ui/icons/List'

import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


import Layout from '../../components/Layout.js'
import { getUsersBySlug, updateUser } from '../../lib/api/users'
import { styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'
import { Typography } from '@material-ui/core';

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user.name,
      avatarUrl: props.user.avatarUrl
    }
  }

  static async getInitialProps({query}) {
    if (query) {
      const data = await getUsersBySlug(query.slug)
      return { user: data }
    }
    return {
      user: {}
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const users = await updateUser({
      slug: this.props.user.slug,
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
    const { name, avatarUrl } = this.state
    const { points } = this.props.user
    return (
      <Layout>
        <Grid
          container
          spacing={16}
          style={{
            marginBottom: 20
          }}
        >
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={24} sm={6}>
              <Link href="/matches/new">
                <Button
                  variant="extendedFab"
                  aria-label="New Match"
                  style={{
                    width: 200,
                    height: 30
                  }}
                >
                  <SoccerIcon />
                  New Match
                </Button>
              </Link>
            </Grid>
            <Grid item xs={24} sm={6}>
              <Link href="/users">
                <Button
                  variant="extendedFab"
                  aria-label="Ranking"
                  style={{
                    width: 200,
                    height: 30
                  }}
                >
                  <ListIcon/>
                  Ranking
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <GridList cols={2}>
          <GridListTile
            cols={2}
            rows={1}
            style={{ height: 'auto', width: '100%' }}
          >
            <ListSubheader component="div">
              <Typography
                variant="display2"
              >
                {name}
              </Typography>
            </ListSubheader>
          </GridListTile>
          <GridListTile
            cols={1}
            rows={1}
          >
            <img
              src={avatarUrl}
              alt={name}
            />
          </GridListTile>
          <GridListTile
            cols={1}
          >
            <List>
              <ListItem>
                <ListItemText primary={`Points: ${points}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="T.B.D." />
              </ListItem>
              <ListItem>
                <ListItemText primary="T.B.D." />
              </ListItem>
            </List>
          </GridListTile>
        </GridList>
        <form
          autoComplete="off"
          style={styleForm}
          onSubmit={this.onSubmit}
        >
          <TextField
            style={styleTextField}
            id="name"
            label="Name"
            value={name}
            onChange={this.handleChange('name')}
            margin="normal"
            required
          />
          <TextField
            style={styleTextField}
            id="avatarUrl"
            label="Avatar URL"
            value={avatarUrl}
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
