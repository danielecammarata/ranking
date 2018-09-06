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

const listItemStyle = {
  fontSize: '.8rem',
  '&.span': {
    fontSize: '.8rem',
  }
}

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
    const { points, stats } = this.props.user
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
        <GridList cols={3}>
          <GridListTile
            cols={3}
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
            cols={2}
            rows={2}
          >
            <img
              src={avatarUrl}
              alt={name}
            />
          </GridListTile>
          <GridListTile
            cols={1}
            rows={2}
          >
            <List>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Points: ${points}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Win streak: ${stats.win_streak}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Longest streak: ${stats.max_win_streak}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Trend: ${stats.points_trend}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Highest points: ${stats.points_max}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Lowest points: ${stats.points_min}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Matches played: ${stats.match_played}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Matches winned: ${stats.match_win}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Crawl: ${stats.match_crawl}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Crawled: ${stats.match_crawled}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Play as defender: ${stats.match_as_defender}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Play as striker: ${stats.match_as_striker}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Goals as defender: ${stats.match_goals_made_as_defender}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Goals as striker: ${stats.match_goals_made_as_striker}`} />
              </ListItem>
              <ListItem style={{padding: 0}}>
                <StatsListItem text={`Goals conceded as striker: ${stats.match_goals_conceded_as_defender}`} />
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

const StatsListItem = ({text}) => {
  return (
    <ListItemText
      primaryTypographyProps={{
        style: {
          fontSize: 12
        }
      }}
      primary={text}
    />
  )
}

export default UpdateUser
