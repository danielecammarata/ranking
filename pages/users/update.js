import React from 'react'
import Router from 'next/router'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormLabel,
  Typography
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CountUp from 'react-countup'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

import Layout from '../../components/Layout'
import ActionsHeader from '../../components/blocks/ActionsHeader'
import MatchesList from '../../components/blocks/MatchesList'
import LoadMore from '../../components/elements/LoadMore'
import PlayerRoleSelection from '../../components/elements/PlayerRoleSelection'
import { prepareMatchData } from '../../components/modifiers'
import { getUsersBySlug, updateUser } from '../../lib/api/users'
import { styleForm } from '../../lib/SharedStyles'
import {
  formArea,
  formButton,
  formButtonWrapper,
  formText,
  paperWrapper,
  popperWrapper,
  userAvatar,
  userFeature,
  userFeatureBar,
  userFeatureBarWrapper,
  userFeatureLabel,
  userFeatureTitle,
  userFeatureValue,
  userFirstChar
} from '../../lib/userPage'
import { getPlayerMatchesList } from '../../lib/api/match'

const styles = theme => ({
  cardTitle: {
    fontSize: '189x',
    fontWeight: '400',
    lineHeight: '30px',
    margin: '0px',
  },
  cardSubheader: {
    color: 'rgb(25, 118, 210)',
    fontSize: '15px',
    fontWeight: '700',
  },
  expand: {
    borderRadius: '0px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.longest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
    width: '100%',
  },
  expandOpen: {
    transform: 'rotateX(180deg)',
  },
  avatar: {
    backgroundColor: 'red',
  },
  radioLegend: {
    color: '#000',
    fontSize: '15px',
    marginBottom: '10px',
    marginTop: '30px',
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      marginTop: '18px',
      width: 'calc(100% - 280px)',
    }
  },
  radioGroup: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    }
  },
  radioLabel: {
    maxHeight: '36px',
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      maxWidth: '33%',
    },
  },
  smallTextField: {
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      marginRight: '50px',
      maxWidth: '230px',
    }
  },
  winBadge: {
    backgroundColor: green[500],
    fontSize: '13px',
    fontWeight: '700',
  },
  loseBadge: {
    backgroundColor: red[500],
    colorPrimary: red[500],
    fontSize: '13px',
    fontWeight: '700',
    left: '30px',
  },
  styleTeamTile: {
    width:'calc(100% - 60px) !important' ,
    [theme.breakpoints.up('sm')]: {
      width:'calc(50% - 60px) !important',
    }
  },
  styleTeamTileLast: {
    width:'calc(100% - 60px) !important' ,
    [theme.breakpoints.up('sm')]: {
      width:'calc(50% - 60px) !important',
      order: '2',
    }
  },
  userDescription: {
    '& > div > div': {
      maxHeight: '100px',
      overflow: 'auto',
    }
  },
  badgesList: {
    textAlign: 'center'
  }
})

const elementPerPage = 6

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user.name,
      avatarUrl: props.user.avatarUrl,
      description: props.user.description,
      role: props.user.role,
      expandend: false,
      anchorEl: null,
      open: false,
      placement: null,
      loadMoreActive: true,
      matchesObj: {},
      matchesFetchedCount: 0,
      numMatches: 0
    }
    this.loadMore = this.loadMore.bind(this);
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

  componentDidMount() {
    try {
      var that = this;
      getPlayerMatchesList(this.props.user._id, 0, elementPerPage, true).then((rs) => {
        const matchesObj = prepareMatchData(rs.matches, this.state.matchesObj)
        const matchesFetchedCount = rs.matches.length
        const numMatches = rs.count
        that.setState({ matchesObj, matchesFetchedCount, numMatches })
        return newMatches
      })
      .catch(reason => {
        throw new Error(reason)
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate() {
    let el = document.querySelectorAll('[data-bar]')
    let barValue

    setTimeout(function(){
      for(let i = 0; i < el.length; i++) {
        barValue = el[i].getAttribute('data-bar-value')
        el[i].style.maxWidth = `${barValue}%`
        el[i].style.opacity = '0.8'
      }
    }, 300)
  }

  loadMore = () => {
    if (this.state.loadMoreActive !== true) {
      return
    }
    this.setState({ loadMoreActive: false })
    try {
      getPlayerMatchesList(this.props.user._id, this.state.matchesFetchedCount, elementPerPage)
        .then((newMatches) => {
          const matchesObj = prepareMatchData(newMatches.matches, this.state.matchesObj)
          const matchesFetchedCount = newMatches.matches.length + this.state.matchesFetchedCount
          this.setState({ matchesObj, matchesFetchedCount, loadMoreActive: this.state.numMatches > matchesFetchedCount})
          return newMatches
        })
        .catch(reason => {
          throw new Error(reason)
        })
    } catch (err) {
      console.error(err)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    await updateUser({
      slug: this.props.user.slug,
      name: this.state.name,
      avatarUrl: this.state.avatarUrl,
      description: this.state.description,
      role: this.state.role,
    })

    Router.push('/users')
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleEdit = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const matchesObj = this.state.matchesObj
    const { name, avatarUrl, description, role, anchorEl, open, placement } = this.state
    const { points, stats } = this.props.user
    const { classes } = this.props
    return (
      <Layout>
        <ActionsHeader />
        <Divider />
        <GridList cols={3}>
          <GridListTile style={userAvatar}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" style={userFirstChar}>
                      {`${name[0]}`}
                    </Avatar>
                  }
                  action={
                    <IconButton style={{position: 'relative'}}>
                      <MoreVertIcon onClick={this.handleEdit('bottom-end')} />
                      <Popper open={open} anchorEl={anchorEl} placement={placement} style={popperWrapper} transition>
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper style={paperWrapper}>
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
                                    style={formText}
                                    id="avatarUrl"
                                    label="Avatar URL"
                                    value={avatarUrl}
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
                                    style={formText}
                                    className={this.props.classes.userDescription}
                                    id="description"
                                    label="Description"
                                    value={description}
                                    multiline
                                    onChange={this.handleChange('description')}
                                    margin="normal"
                                  />
                                </div>
                                <div style={formButtonWrapper}>
                                  <Button
                                    style={formButton}
                                    variant="contained"
                                    type="submit"
                                  >
                                    EDIT
                                  </Button>
                                </div>
                              </form>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </IconButton>
                  }
                  title={<h3 className={classes.cardTitle}>{name}</h3>}
                  subheader={<span className={classes.cardSubheader}><CountUp start={1200} end={points} duration={2.1}/></span>}
                />
                <CardMedia
                  style = {{height: '350px'}}
                  image={avatarUrl}
                  title="Contemplative Reptile"
                />
                <div style={{backgroundColor: 'rgba(103,103,103,0.85)', borderRadius: '0% 50% 50% 50%', height: '100px', left: '0', position: 'absolute', top: '86px', width: '100px'}}>
                  <img src={`/img/attacco-difesa/${role}.svg`} style={{height: '100%'}} />
                </div>
                <CardContent>
                  <Typography component="p">
                  {description}
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                    style={{paddingTop: '0px'}}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <GridListTile style={{display: 'block', height: 'initial', width: '100%'}}>
                      <List>
                        <ListItem style={userFeatureTitle}>
                          <h5 style={{margin: '20px 20px 20px 0'}}>SCORE</h5>
                          <div style={userFeatureBarWrapper}>
                            <div data-bar data-bar-value={`${stats.points_max * 50 / 1200}`} style={userFeatureBar()}></div>
                            <div data-bar data-bar-value={`${stats.points_min * 50 / 1200}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
                          </div>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Points</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={points} duration={1.6}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Highest points</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.points_max} duration={1.7}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Lowest points</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.points_min} duration={2.5}/></span>
                        </ListItem>
                        <ListItem style={userFeatureTitle}>
                          <h5 style={{margin: '20px 20px 20px 0'}}>TRENDS</h5>
                          <div style={userFeatureBarWrapper}>
                            <div data-bar data-bar-value={`${stats.max_win_streak}`} style={userFeatureBar()}></div>
                            <div data-bar data-bar-value={`${stats.points_trend}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
                          </div>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Win streak</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.win_streak} duration={1.9}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Longest streak </span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.max_win_streak} duration={1.6}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Trend</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.points_trend} duration={2.2}/></span>
                        </ListItem>
                        <ListItem style={userFeatureTitle}>
                          <h5 style={{margin: '20px 20px 20px 0'}}>MATCHES</h5>
                          <div style={userFeatureBarWrapper}>
                            <div data-bar data-bar-value={`${stats.match_win / stats.match_played * 100}`} style={userFeatureBar()}></div>
                            <div data-bar data-bar-value={`${(stats.match_played - stats.match_win) / stats.match_played * 100}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
                          </div>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Played</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_played} duration={2}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Winned</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_win} duration={1.9}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Crawl</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_crawl} duration={1.7}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Crawled</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_crawled} duration={2.1}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>As defender</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_as_defender} duration={1.3}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>As striker</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_as_striker} duration={1.4}/></span>
                        </ListItem>
                        <ListItem style={userFeatureTitle}>
                          <h5 style={{margin: '20px 20px 20px 0'}}>GOALS</h5>
                          <div style={userFeatureBarWrapper}>
                            <div data-bar data-bar-value={`${stats.match_goals_made_as_defender / stats.match_goals_made_as_striker * 100}`} style={userFeatureBar()}></div>
                          </div>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>As defender</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_made_as_defender} duration={2.1}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>As striker</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_made_as_striker} duration={1.6}/></span>
                        </ListItem>
                        <ListItem style={userFeature}>
                          <span style={userFeatureLabel}>Conceded as defender</span>
                          <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_conceded_as_defender} duration={1.45}/></span>
                        </ListItem>
                      </List>
                    </GridListTile>
                  </CardContent>
                </Collapse>
              </Card>


          </GridListTile>

        </GridList>

        {/* New grouped matches list */}
        <GridList style={{margin: '0 auto', maxWidth: '768px'}}>
          {Object.keys(matchesObj).map(matchKey =>
            <MatchesList
              label={matchKey}
              matches={matchesObj[matchKey].matches}
              classes={this.props.classes}
            />
          )}
        </GridList>
        <LoadMore
          loadMoreActive={this.state.loadMoreActive}
          loadMore={this.loadMore}
        />
      </Layout>
    )
  }
}

export default withStyles(styles)(UpdateUser)
