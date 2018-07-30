import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mainDrawerListItems, bottomDrawerListItems } from './tileData';
import indigo from '@material-ui/core/colors/indigo'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: indigo[700],
    marginRight: 15,
    textDecoration: 'none',
    '&:visited': {
      color: indigo[900]
    },
    '&:hover': {
      color: indigo[500]
    }
  }
};

class TemporaryDrawer extends React.Component {
  render() {
    const { classes, open } = this.props

    const sideList = (
      <div className={classes.list}>
        <List>{mainDrawerListItems}</List>
        <Divider />
        <List>{bottomDrawerListItems}</List>
      </div>
    );

    return (
      <div>
        <Drawer open={open} anchor="right"  onClose={this.props.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer}
            onKeyDown={this.props.toggleDrawer}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
