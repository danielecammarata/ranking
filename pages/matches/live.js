import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Layout from '../../components/Layout.js'
import Avatars from '../../lib/Avatars.js'
import { styleLedBox, styleLedRed } from '../../lib/LedStyles.js'
import { styleH1, styleCard, styleCardContainer, styleCardContent, styleBigAvatar } from '../../lib/SharedStyles'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import TimerIcon from '@material-ui/icons/Timer'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'


import { startWatch, resetWatch } from '../../lib/stopwatch'

class LiveMatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      homeTeam: {
        defender: {
          name: 'darington',
          avatarUrl: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:scenic:/international/nick-dev/images/series/blaze-and-the-monster-machines/character-art/darington-character-art.png?height=0&width=480&matte=true&crop=false',
          score: 0
        },
        striker: {
          name: 'stripes',
          avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5ed914d8c4188e0b0837.png',
          score: 0
        },
        score: 0
      },
      awayTeam: {
        defender: {
          name: 'zeg',
          avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5ee114d8c4188e0b0838.png',
          score: 0
        },
        striker: {
          name: 'blaze',
          avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5eed14d8c4188e0b0839.png',
          score: 0
        },
        score: 0
      },
      realTime: new Date(2018, 11, 24, 0, 0, 0, 0),
      timer: '00:00:00'
    }
    resetWatch()
  }

  addGoalBy = (team, role) => {
    const value = Object.assign({}, this.state[team],
      {
        [role]: {
          name: this.state[team][role].name,
          avatarUrl: this.state[team][role].avatarUrl,
          score: this.state[team][role].score + 1
        },
        score: this.state[team].defender.score + this.state[team].striker.score + 1
      }
    )
    this.setState({[team]: value})
  }

  removeGoalBy = (team, role) => {
    const value = Object.assign({}, this.state[team],
      {
        [role]: {
          name: this.state[team][role].name,
          avatarUrl: this.state[team][role].avatarUrl,
          score: this.state[team][role].score - 1
        },
        score: this.state[team].defender.score + this.state[team].striker.score - 1
      }
    )
    console.log(value)
    this.setState({[team]: value})
  }

  clearTime

  updateTimer = () => {
    const val = startWatch()
    console.log(val)
    this.setState({timer: val})
  }

  activateTimer = () => {
    this.clearTime = setInterval(this.updateTimer, 1000)
  }

  pauseTimer = () => {
    clearTimeout(this.clearTime)
    this.clearTime = null
  }

  resetTimer = () => {
    clearTimeout(this.clearTime)
    this.clearTime = null
    this.setState({timer: '00:00:00'}, resetWatch())
  }

  render () {
    return (
      <Layout>
        <h1 style={styleH1}>This is the live matches</h1>
        <Divider />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden'
        }}>
          <GridList style={{
            position: 'relative'
          }}>
            {/* HOME TEAM */}
            <Avatar style={Avatars}>
              {'' + this.state.homeTeam.score}
            </Avatar>

            <GridListTile cols="1" rows="1">
              <img
                alt={this.state.homeTeam.defender.name}
                src={this.state.homeTeam.defender.avatarUrl}
              />
              <GridListTileBar
                title={this.state.homeTeam.defender.name}
                actionIcon={
                  <div>
                  <IconButton style={{
                    color: 'rgba(255, 255, 255, 0.54)'
                  }}>
                    <RemoveIcon
                      onClick={() => this.removeGoalBy('homeTeam', 'defender')}
                    />
                  </IconButton>
                  <IconButton>
                    <Avatar>
                      {'' + this.state.homeTeam.defender.score}
                    </Avatar>
                  </IconButton>
                  <IconButton style={{
                    color: 'rgba(255, 255, 255, 0.54)'
                  }}>
                    <AddIcon
                      onClick={() => this.addGoalBy('homeTeam', 'defender')}
                    />
                  </IconButton>
                  </div>
                }
              />
            </GridListTile>

            <GridListTile cols="1" rows="1">
              <img
                alt={this.state.homeTeam.striker.name}
                src={this.state.homeTeam.striker.avatarUrl}
              />
              <GridListTileBar
                title={this.state.homeTeam.striker.name}
                actionIcon={
                  <div>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <RemoveIcon
                        onClick={() => this.removeGoalBy('homeTeam', 'striker')}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar>
                        {'' + this.state.homeTeam.striker.score}
                      </Avatar>
                    </IconButton>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <AddIcon
                        onClick={() => this.addGoalBy('homeTeam', 'striker')}
                      />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
            <GridListTile cols={2} style={{ height: 'auto' }}>
              <IconButton style={{
                color: '#000'
              }}>
                <TimerIcon />
              </IconButton>
              <div style={{
                display: 'inline-block',
                width: '65px',
                border: '1px solid',
                textAlign: 'center',
                height: '30px',
                lineHeight: '30px',
                borderRadius: '8px'
              }}>
                {this.state.timer}
              </div>
              <IconButton style={{
                color: '#000'
              }}>
                <PlayIcon
                  onClick={this.activateTimer}
                />
              </IconButton>
              <IconButton style={{
                color: '#000'
              }}>
                <PauseIcon
                  onClick={this.pauseTimer}
                />
              </IconButton>
              <IconButton style={{
                color: '#000'
              }}>
                <ReplayIcon
                  onClick={this.resetTimer}
                />
              </IconButton>
            </GridListTile>

            {/* AWAY TEAM */}
            <Avatar
              style={{
                width: '45px',
                height: '45px',
                padding: 0,
                position: 'absolute',
                top: '75%',
                left: '50%',
                zIndex: '2',
                marginTop: '-28px',
                marginLeft: '-22.5px',
                backgroundColor: 'green'
              }}
            >
              {'' + this.state.awayTeam.score}
            </Avatar>
            <GridListTile cols="1" rows="1">
              <img
                alt={this.state.awayTeam.defender.name}
                src={this.state.awayTeam.defender.avatarUrl}
              />
              <GridListTileBar
                title={this.state.awayTeam.defender.name}
                actionIcon={
                  <div>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <RemoveIcon
                        onClick={() => this.removeGoalBy('awayTeam', 'defender')}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar>
                        {'' + this.state.awayTeam.defender.score}
                      </Avatar>
                    </IconButton>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <AddIcon
                        onClick={() => this.addGoalBy('awayTeam', 'defender')}
                      />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>

            <GridListTile cols="1" rows="1">
              <img
                alt={this.state.awayTeam.striker.name}
                src={this.state.awayTeam.striker.avatarUrl}
              />
              <GridListTileBar
                title={this.state.awayTeam.striker.name}
                actionIcon={
                  <div>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <RemoveIcon
                        onClick={() => this.removeGoalBy('awayTeam', 'striker')}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar>
                        {'' + this.state.awayTeam.striker.score}
                      </Avatar>
                    </IconButton>
                    <IconButton style={{
                      color: 'rgba(255, 255, 255, 0.54)'
                    }}>
                      <AddIcon
                        onClick={() => this.addGoalBy('awayTeam', 'striker')}
                      />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          </GridList>
        </div>
      </Layout>
    )
  }
}

export default LiveMatch
