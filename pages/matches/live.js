import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Layout from '../../components/Layout.js'
import Avatars from '../../lib/Avatars.js'
import { styleAwayActualScore, styleHomeActualScoreDef, stylePlayerTileAway, stylePlayerTileHome, styleHomeActualScoreStr, styleAwayActualScoreDef, styleAwayActualScoreStr, styleHomeActualScore, stylePlayer, stylePlayerAka, stylePlayerPosition, stylePlayerRoleD, stylePlayerRoleS, stylePlayerDivider1, stylePlayerDivider2, stylePlayerScore, stylePlayerBarAway, stylePlayerBarHome, stylePlayerName, styleTimer, styleTimerButton, styleTimerIcon, styleAddScoreButton, styleRemoveScoreButton } from '../../lib/LiveMatch'
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
        //   avatarUrl: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:scenic:/international/nick-dev/images/series/blaze-and-the-monster-machines/character-art/darington-character-art.png?height=0&width=480&matte=true&crop=false',
          avatarUrl: 'https://ungif.apps.railslabs.com/ungif?url=http://i63.tinypic.com/2d9b7mr.jpg&size=115x115',
          score: 0
        },
        striker: {
          name: 'stripes',
        //   avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5ed914d8c4188e0b0837.png',
          avatarUrl: 'https://ungif.apps.railslabs.com/ungif?url=http://i63.tinypic.com/whchhf.jpg&size=115x115',
          score: 0
        },
        score: 0
      },
      awayTeam: {
        defender: {
          name: 'zeg',
        //   avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5ee114d8c4188e0b0838.png',
          avatarUrl: 'https://ungif.apps.railslabs.com/ungif?url=https://preview.ibb.co/bB70j5/IMG_0193.jpg&size=115x115',
          score: 0
        },
        striker: {
          name: 'blaze',
        //   avatarUrl: 'http://www.stickpng.com/assets/images/5a5a5eed14d8c4188e0b0839.png',
          avatarUrl: 'https://ungif.apps.railslabs.com/ungif?url=https://s3.amazonaws.com/uploads.hipchat.com/22279/1927309/HnDbJMu9i69oopB/upload.png&size=115x115',
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
        <h1 style={styleH1}>Live match</h1>
        <Divider />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden'
        }}>
          <GridList style={{
            position: 'relative',
            width: '100%'
          }}>

            {/* HOME TEAM */}
            <div style={styleHomeActualScore}>
            {'' + this.state.homeTeam.score}
            </div>
            <div style={styleHomeActualScoreDef}>
            {'' + this.state.homeTeam.defender.score}
            </div>
            <div style={styleHomeActualScoreStr}>
            {'' + this.state.homeTeam.striker.score}
            </div>
            {/* AWAY TEAM */}
            <div style={styleAwayActualScore}>
              {'' + this.state.awayTeam.score}
            </div>
            <div style={styleAwayActualScoreDef}>
              {'' + this.state.awayTeam.defender.score}
            </div>
            <div style={styleAwayActualScoreStr}>
              {'' + this.state.awayTeam.striker.score}
            </div>

            <GridListTile cols="1" rows="2" style={stylePlayerTileHome}>
              <div style={stylePlayer(this.state.homeTeam.defender.avatarUrl)}>
                <div style={stylePlayerRoleD}>D</div>
                <p style={stylePlayerName}>{this.state.homeTeam.defender.name}</p>
                <p style={stylePlayerPosition}>n°</p>
                <Divider style={stylePlayerDivider1} />
                <Divider style={stylePlayerDivider2} />
                <p style={stylePlayerAka}>A.K.A.</p>
                <p style={stylePlayerScore}>
                  000{this.state.homeTeam.defender.score}
                  <small> pt</small>
                </p>
              </div>
              <IconButton style={styleRemoveScoreButton} onClick={() => this.removeGoalBy('homeTeam', 'defender')}>
                  <RemoveIcon/>
              </IconButton>
              <IconButton style={styleAddScoreButton} onClick={() => this.addGoalBy('homeTeam', 'defender')}>
                  <AddIcon/>
              </IconButton>
            </GridListTile>

            <GridListTile cols="1" rows="2" style={stylePlayerTileHome}>
              <div style={stylePlayer(this.state.homeTeam.striker.avatarUrl)}>
                <div style={stylePlayerRoleS}>S</div>
                <p style={stylePlayerName}>{this.state.homeTeam.striker.name}</p>
                <p style={stylePlayerPosition}>n°</p>
                <Divider style={stylePlayerDivider1} />
                <Divider style={stylePlayerDivider2} />
                <p style={stylePlayerAka}>A.K.A.</p>
                <p style={stylePlayerScore}>
                  000{this.state.homeTeam.striker.score}
                  <small> pt</small>
                </p>
                <IconButton style={styleRemoveScoreButton} onClick={() => this.removeGoalBy('homeTeam', 'striker')}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton style={styleAddScoreButton} onClick={() => this.addGoalBy('homeTeam', 'striker')}>
                    <AddIcon/>
                </IconButton>
              </div>
            </GridListTile>

            <GridListTile cols={2} style={{ height: 'auto' }}>
              <div style={styleTimer}>
                <IconButton style={styleTimerButton}>
                    <TimerIcon style={{fontSize: '30px', marginLeft: '-10px', marginTop: '-5px'}} />
                </IconButton>
                {this.state.timer}
              </div>
              <div style={{clear: 'both', float: 'none'}}></div>
              <IconButton style={styleTimerButton}>
                <PauseIcon
                  style={styleTimerIcon}
                  onClick={this.pauseTimer}
                />
              </IconButton>
              <IconButton style={styleTimerButton}>
                <PlayIcon
                  style={styleTimerIcon}
                  onClick={this.activateTimer}
                />
              </IconButton>
              <IconButton style={styleTimerButton}>
                <ReplayIcon
                  style={styleTimerIcon}
                  onClick={this.resetTimer}
                />
              </IconButton>
            </GridListTile>

            <GridListTile cols="1" rows="2" style={stylePlayerTileAway}>
              <div style={stylePlayer(this.state.awayTeam.defender.avatarUrl)}>
                <div style={stylePlayerRoleD}>D</div>
                <p style={stylePlayerName}>{this.state.awayTeam.defender.name}</p>
                <p style={stylePlayerPosition}>n°</p>
                <Divider style={stylePlayerDivider1} />
                <Divider style={stylePlayerDivider2} />
                <p style={stylePlayerAka}>A.K.A.</p>
                <p style={stylePlayerScore}>
                  000{this.state.awayTeam.defender.score}
                  <small> pt</small>
                </p>
                <IconButton style={styleRemoveScoreButton} onClick={() => this.removeGoalBy('awayTeam', 'defender')}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton style={styleAddScoreButton} onClick={() => this.addGoalBy('awayTeam', 'defender')}>
                    <AddIcon/>
                </IconButton>
              </div>
            </GridListTile>

            <GridListTile cols="1"  rows="2" style={stylePlayerTileAway}>
              <div style={stylePlayer(this.state.awayTeam.striker.avatarUrl)}>
                <div style={stylePlayerRoleS}>S</div>
                <p style={stylePlayerName}>{this.state.awayTeam.striker.name}</p>
                <p style={stylePlayerPosition}>n°</p>
                <Divider style={stylePlayerDivider1} />
                <Divider style={stylePlayerDivider2} />
                <p style={stylePlayerAka}>A.K.A.</p>
                <p style={stylePlayerScore}>
                  000{this.state.awayTeam.striker.score}
                  <small> pt</small>
                </p>
                <IconButton style={styleRemoveScoreButton} onClick={() => this.removeGoalBy('awayTeam', 'striker')}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton style={styleAddScoreButton} onClick={() => this.addGoalBy('awayTeam', 'striker')}>
                    <AddIcon/>
                </IconButton>
              </div>
            </GridListTile>
          </GridList>
        </div>
      </Layout>
    )
  }
}

export default LiveMatch
