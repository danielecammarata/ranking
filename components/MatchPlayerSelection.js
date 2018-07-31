import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'
import Avatar from '@material-ui/core/Avatar'

import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Router from 'next/router'

import getRootUrl from '../lib/api/getRootUrl'
import { getUsersList } from '../lib/api/users'
import { addNewMatch } from '../lib/api/match'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../lib/SharedStyles'

const styles = theme => ({
  tile: {
    width: '218px',
    height: '218px',
    margin: '2px'
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },

  list: {
    backgroundColor: theme.palette.background.paper,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 2
  },

  listSection: {
    backgroundColor: 'inherit',
  },

  ul: {
    backgroundColor: 'inherit',
    cursor: 'pointer'
  }
})

const PinnedSubheaderList = props => {
  const {classes, playersList, onSelectPlayer} = props

  return (
    <List className={classes.list}>
      {playersList.map(item => (
        <React.Fragment>
          <ListItem
            key={`item-${item.name}`}
            className={classes.ul}
            onClick={() => onSelectPlayer(item)}
          >
            <Avatar
              src={item.avatarUrl}
            />
            <ListItemText primary={item.name}/>
          </ListItem>
          <Divider/>
        </React.Fragment>
      ))}
    </List>
  )
}

withStyles(styles)(PinnedSubheaderList)

class MatchPlayerSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playersList: [],
      showPlayersSelect: false,
      _id: '',
      selected: false,
      avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
      name: ''
    }
  }

  async componentDidMount () {
    try {
      const players = await getUsersList()
      this.setState({playersList: players})
    } catch (err) {
      console.log(err)
    }
  }

  showPlayersSelect = () => {
    this.setState({showPlayersSelect: true})
  }

  handleChange = event => {
    const {_id, name, avatarUrl} = event.target.value
    this.setState({
      _id: _id,
      name: name,
      avatarUrl: avatarUrl,
      showPlayersSelect: false,
      selected: true
    })
  }

  onSelectPlayer = (player) => {
    this.setState({
      _id: player._id,
      name: player.name,
      avatarUrl: player.avatarUrl,
      showPlayersSelect: false,
      selected: true
    })
    this.props.onPlayerSelection(player, this.props.selector)
  }

  playerStatus = () => {
    console.log('player status')
  }

  render () {
    const {avatarUrl, name, showPlayersSelect, selected} = this.state
    const {classes} = this.props

    return (
      <React.Fragment>
        <GridListTile
          cols={1}
          rows={1}
          className={classes.tile}
        >
          <img
            src={avatarUrl}
            alt={name}
            onError={() => this.src = `${getRootUrl()}/img/user_placeholder.jpg`}
          />
          {name &&
          <GridListTileBar
            title={name}
          />
          }
          <Button
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            onClick={() => this.showPlayersSelect()}
          >
            <AddIcon/>
          </Button>
        </GridListTile>
        {
          showPlayersSelect &&
          <PinnedSubheaderList
            classes={classes}
            playersList={this.state.playersList}
            onSelectPlayer={this.onSelectPlayer}
          />
        }
      </React.Fragment>
    )
  }
}

MatchPlayerSelection.getInitialState = async function getInitialProps () {
  try {
    const players = await getUsersList()
    return {
      players: players
    }
  } catch (err) {
    console.log(err)
    return {
      players: []
    }
  }
}

export default withStyles(styles)(MatchPlayerSelection)
