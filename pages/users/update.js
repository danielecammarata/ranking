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
import { formArea, formButton, formButtonWrapper, formText, formTextSmall, userAvatar, userAvatarImg, userFeature, userFeatureLabel, userFeatureTitle, userFeatureValue } from '../../lib/userPage'
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

              <form
                autoComplete="off"
                style={styleForm}
                onSubmit={this.onSubmit}
              >
                <div style={formArea}>
                  <TextField
                    style={formText}
                    id="name"
                    label="Name"
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    required
                  />
                  <TextField
                    style={formTextSmall}
                    id="avatarUrl"
                    label="Avatar URL"
                    value={avatarUrl}
                    onChange={this.handleChange('avatarUrl')}
                    margin="normal"
                    required
                  />
                </div>
                <div style={formButtonWrapper}>
                  <Button
                    style={formButton}
                    variant="contained"
                    type="submit"
                  >
                    Modify
                  </Button>
                </div>
              </form>

              {/* <Typography
                variant="display2"
              >
                {name}
              </Typography> */}
            </ListSubheader>
          </GridListTile>
          <GridListTile style={userAvatar}>
            <img
              alt={name}
              style={userAvatarImg}
              src={avatarUrl}
            />
          </GridListTile>
          <GridListTile style={{display: 'block', height: 'initial', width: '100%'}}>
            <List>
              <ListItem style={userFeatureTitle}>
                <h5>SCORE</h5>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Points</span>
                <span style={userFeatureValue}>{`${points}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Highest points</span>
                <span style={userFeatureValue}>{`${stats.points_max}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Lowest points</span>
                <span style={userFeatureValue}>{`${stats.points_min}`}</span>
              </ListItem>
              <ListItem style={userFeatureTitle}>
                <h5>TRENDS</h5>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Win streak</span>
                <span style={userFeatureValue}>{`${stats.win_streak}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Longest streak </span>
                <span style={userFeatureValue}>{`${stats.max_win_streak}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Trend</span>
                <span style={userFeatureValue}>{`${stats.points_trend}`}</span>
              </ListItem>
              <ListItem style={userFeatureTitle}>
                <h5>MATCHES</h5>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Played</span>
                <span style={userFeatureValue}>{`${stats.match_played}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Winned</span>
                <span style={userFeatureValue}>{`${stats.match_win}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Crawl</span>
                <span style={userFeatureValue}>{`${stats.match_crawl}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Crawled</span>
                <span style={userFeatureValue}>{`${stats.match_crawled}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>As defender</span>
                <span style={userFeatureValue}>{`${stats.match_as_defender}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>As striker</span>
                <span style={userFeatureValue}>{`${stats.match_as_striker}`}</span>
              </ListItem>
              <ListItem style={userFeatureTitle}>
                <h5>GOALS</h5>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>As defender</span>
                <span style={userFeatureValue}>{`${stats.match_goals_made_as_defender}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>As striker</span>
                <span style={userFeatureValue}>{`${stats.match_goals_made_as_striker}`}</span>
              </ListItem>
              <ListItem style={userFeature}>
                <span style={userFeatureLabel}>Conceded as striker</span>
                <span style={userFeatureValue}>{`${stats.match_goals_conceded_as_defender}`}</span>
              </ListItem>
            </List>
          </GridListTile>
        </GridList>
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
