import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import Layout from '../../components/Layout.js'
import { getUsersList, deleteUser } from '../../lib/api/users'
import { styleH1, styleCard, styleCardContainer, styleCardContent, styleBigAvatar } from '../../lib/SharedStyles'

import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import {
  AlienIcon,
  BombIcon,
  BoneIcon,
  CandycaneIcon,
  CannabisIcon,
  CatIcon,
  ChessKingIcon,
  DogIcon,
  DuckIcon,
  EmoticonPoopIcon,
  FoodIcon,
  GhostIcon,
  NinjaIcon,
  NukeIcon,
  PigIcon,
  PirateIcon,
  RocketIcon,
  SkullIcon,
  SoccerFieldIcon,
  SoccerIcon,
  TrophyIcon,
  WeatherSnowyIcon
} from '../../components/IconComponents'
import lightBlue from '@material-ui/core/colors/lightBlue'

class IndexUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || [],
      userDeleted: false
    }
  }

  async componentDidMount() {
    try {
      const data = await getUsersList()
      this.setState({ users: data })
    } catch (err) {
      console.log(err)
    }
  }

  async removeUser (user, e) {
    e.preventDefault()
    const removedUser = await deleteUser(user._id)
    const localUserList = this.state.users.filter( el => el._id !== removedUser._id )
    this.setState({ users: localUserList, userDeleted: true })
  }

// https://static.nexilia.it/bitchyf/2018/05/cristiano-malgioglio-danzando-800x500.jpg

  render() {
    return (
      <Layout>
        <h1 style={styleH1}>Ranking</h1>
        <Divider />
        <List>
          {this.state.users && this.state.users.map((user, index) => (
            <Link as={`/users/${user.slug}`} href={`/users/update/?slug=${user.slug}`}>
            <ListItem
              key={user.slug}
              divider
            >

                <Typography
                  style={{
                    paddingRight: 15,
                    fontSize: 22
                  }}
                >
                  {index + 1}
                </Typography>
                <ListItemAvatar>
                  <Avatar
                    alt={user.name}
                    src={user.avatarUrl}
                    style={{
                      height: 80,
                      width: 80
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  primaryTypographyProps={{
                    style: {
                      fontSize: 15
                    }
                  }}
                  secondary={user.points}
                  secondaryTypographyProps={{
                    style: {
                      fontSize: 18,
                      color: lightBlue[500]
                    }
                  }}
                />
                {/*
                  THIS SHOULD BE USED FOR THE BADGES
                <ListItemSecondaryAction>
                  <PirateIcon />
                  <RocketIcon />
                </ListItemSecondaryAction> */}
            </ListItem>
              </Link>
          ))}
        </List>
      </Layout>
    )
  }


}
export default IndexUser
