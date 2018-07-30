// This file is shared across the demos.

import React from 'react';
import Link from 'next/link'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import InfoIcon from '@material-ui/icons/Info';
import NewMatchIcon from '@material-ui/icons/DirectionsRun';
import NewUserIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import ReportIcon from '@material-ui/icons/Report';

export const mainDrawerListItems = (
  <div>
    <Link href="/matches">
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Matches list" />
      </ListItem>
    </Link>
    <Link href="/matches/new">
      <ListItem button>
        <ListItemIcon>
          <NewMatchIcon />
        </ListItemIcon>
        <ListItemText primary="New match" />
      </ListItem>
    </Link>
    <Link href="/users">
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Users list" />
      </ListItem>
    </Link>
    <Link href="/users/new">
      <ListItem button>
        <ListItemIcon>
          <NewUserIcon />
        </ListItemIcon>
        <ListItemText primary="New user" />
      </ListItem>
    </Link>
  </div>
)

export const bottomDrawerListItems = (
  <div>
    <Link href="/about">
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
  </div>
)
