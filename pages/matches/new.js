import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'

import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'

import Router from 'next/router'

import Layout from '../../components/Layout.js'
import PlayerDialogSelect from '../../components/PlayerDialogSelect.js'
import getRootUrl from '../../lib/api/getRootUrl'
import { getUsersList} from '../../lib/api/users'
import { addNewMatch } from '../../lib/api/match'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

import MatchPlayerSelection from '../../components/MatchPlayerSelection'
import MatchPlayerHeader from '../../components/MatchPlayerHeader'


class AddMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        search: '',
        players: [],
        matchAdded: false,
        teamHome: {
            defender: {
              showNames: false,
              selected: false,
              avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
              name: ''
            },
            striker: {
              showNames: false,
              selected: false,
              avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
              name: ''
            },
            score: 0
        },
        teamAway: {
            defender: {
              showNames: false,
              selected: false,
              avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
              name: ''
            },
            striker: {
              showNames: false,
              selected: false,
              avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
              name: ''
            },
            score: 0
        },

        enableScore: false,
        homeGoals: 0,
        awayGoals: 0,
        homeDefenderSelected: false,
        homeStrikerSelected: false,
        awayDefenderSelected: false,
        awayStrikerSelected: false,
        badges: []
    }

  }

  handleScoreChange = name => event => {
    const teamObj = Object.assign({}, this.state[name], {score: event.target.value} )
    this.setState({
      [name]: teamObj
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const match = await addNewMatch({
      teamHome: this.state.teamHome,
      teamAway: this.state.teamAway,
      badges: []
    })

    this.setState({ matchAdded: true })
    Router.push('/matches')
  }

  onPlayerSelection = (player, selector) => {
    console.log(player)
    console.log(selector)
    this.setState({[selector]: true})
  }

  render() {
    return (
      <Layout>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden'
        }}>
          <GridList
            cols={2}
            cellHeight={180}
            style={{
              position: 'relative',
              width: '365px'
            }}
          >
            <MatchPlayerHeader
              enableScore={this.state.homeDefenderSelected && this.state.homeStrikerSelected}
              teamLabel={'Team Home'}
            />
            <MatchPlayerSelection
              selector={'homeDefenderSelected'}
              team={'teamHome'}
              role={'defender'}
              onPlayerSelection={this.onPlayerSelection}
            />
            <MatchPlayerSelection
              selector={'homeStrikerSelected'}
              team={'teamHome'}
              role={'striker'}
              onPlayerSelection={this.onPlayerSelection}
            />
            <MatchPlayerHeader
              enableScore={this.state.awayDefenderSelected && this.state.awayStrikerSelected}
              teamLabel={'Team Away'}
            />
            <MatchPlayerSelection
              selector={'awayDefenderSelected'}
              team={'teamAway'}
              role={'defender'}
              onPlayerSelection={this.onPlayerSelection}
            />
            <MatchPlayerSelection
              selector={'awayStrikerSelected'}
              team={'teamAway'}
              role={'striker'}
              onPlayerSelection={this.onPlayerSelection}
            />
            { this.state.homeDefenderSelected && this.state.homeStrikerSelected && this.state.awayDefenderSelected && this.state.awayStrikerSelected &&
              <GridListTile cols={2} style={{ height: 'auto', width: '100%' }}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </GridListTile>
            }
          </GridList>

        </div>
      </Layout>
    )
  }
}

export default AddMatch
