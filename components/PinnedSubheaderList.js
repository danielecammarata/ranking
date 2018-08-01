import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  listWrapper: {
    backgroundColor: theme.palette.background.paper,
    bottom: 0,
    left: 0,
    overflowY: 'auto',
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
    <div className={classes.listWrapper}>
      <div className={classes.listInner}>
        <List className={classes.list}>
          {playersList.map(item => (
            <React.Fragment
              key={`item-${item.name}`}
            >
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
              <Divider
                key={`divider-${item.name}`}
              />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  )
}

export default withStyles(styles)(PinnedSubheaderList)
