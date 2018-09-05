import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import React from 'react'
import Router from 'next/router'
import getRootUrl from '../../lib/api/getRootUrl'
import Layout from '../../components/Layout.js'
import MatchPlayerHeader from '../../components/MatchPlayerHeader'
import MatchPlayerSelection from '../../components/MatchPlayerSelection'
import PinnedSubheaderList from '../../components/PinnedSubheaderList'
import { addNewMatch } from '../../lib/api/match'
import { getUsersList } from '../../lib/api/users'
import { styleForm } from '../../lib/SharedStyles'
import ReactAudioPlayer from 'react-audio-player'

const defaultPlayer = {
  _id: 'default',
  avatarUrl: `${getRootUrl()}/img/user_placeholder.jpg`,
  name: '',
  selected: false,
  showNames: false
}

class AddMatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSelection: null,
      awayDefender: defaultPlayer,
      awayDefenderSelected: false,
      awayGoals: NaN,
      awayGoalsDefender: NaN,
      awayGoalsStriker: NaN,
      awayStriker: defaultPlayer,
      awayStrikerSelected: false,
      badges: [],
      enableScore: false,
      homeDefender: defaultPlayer,
      homeDefenderSelected: false,
      homeGoals: NaN,
      homeGoalsDefender: NaN,
      homeGoalsStriker: NaN,
      homeStriker: defaultPlayer,
      homeStrikerSelected: false,
      matchAdded: false,
      search: '',
      showSelectionList: false,
      backgroundSoundTracks: [
        'theKingOfFighters.ogg',
        'BurningD.N.A.ogg',
        'ESAKA.ogg'
      ],
      currentSoundTrack: 0,
      showScores: false
    }

    this.onSelectPlayer = this.onSelectPlayer.bind(this)
  }

  async componentDidMount () {
    try {
      await this.loadAudio(document.getElementById('background_audio'), { src: this.getBackgroundAudio(), volume: 1.0 }).then(() => {
        this.startAudio(document.getElementById('background_audio'), { volume: 1.0 })
      })
      const players = await getUsersList()
      this.setState({playersList: players})
    } catch (err) {
      console.log(err)
    }
  }

  handleScoreChange = name => event => {
    const teamObj = Object.assign({}, this.state[name], {score: event.target.value})
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

    this.setState({matchAdded: true})
    Router.push('/')
  }

  onSelectPlayer = player => {
    this.setState({
        [`${this.state.activeSelection}`]: player,
        activeSelection: null,
        showSelectionList: false
    }, () => { this.setState({ "showScores": this.isReady()}) })
    this.createAndStartAudio(getRootUrl() + '/sound/player_selection.ogg')
  }

  showPlayersSelect = pointer => () => {    
    this.setState({
      activeSelection: pointer,
      showSelectionList: true
    })
  }

  onScoreChange = params => {
    const {value, selector} = params
    this.setState({[selector]: value})
  }

  calculateScoreAndBadges = () => {
    const scoreAndBadges = {
      badges: []
    }
    if (this.state.homeGoals === 0 || this.state.awayGoals === 0) {
      scoreAndBadges.badges.push('cappotto')
      this.createAndStartAudio(getRootUrl() + '/sound/perfect.ogg')
    }

    if (this.state.homeGoalsDefender + this.state.homeGoalsStriker !== this.state.homeGoals) {
      scoreAndBadges.homeGoalsDefender = Math.floor(this.state.homeGoals / 2)
      scoreAndBadges.homeGoalsStriker = Math.ceil(this.state.homeGoals / 2)
    } else {
      scoreAndBadges.homeGoalsDefender = this.state.homeGoalsDefender
      scoreAndBadges.homeGoalsStriker = this.state.homeGoalsStriker
    }

    if (this.state.awayGoalsDefender + this.state.awayGoalsStriker !== this.state.awayGoals) {
      scoreAndBadges.awayGoalsDefender = Math.floor(this.state.awayGoals / 2)
      scoreAndBadges.awayGoalsStriker = Math.ceil(this.state.awayGoals / 2)
    } else {
      scoreAndBadges.awayGoalsDefender = this.state.awayGoalsDefender
      scoreAndBadges.awayGoalsStriker = this.state.awayGoalsStriker
    }

    return scoreAndBadges
  }

  getBackgroundAudio = () => {
    this.state.currentSoundTrack++
    if(this.state.backgroundSoundTracks.length <= this.state.currentSoundTrack) {
      this.state.currentSoundTrack = 0
    }
    return getRootUrl() + '/sound/' + this.state.backgroundSoundTracks[this.state.currentSoundTrack]
  }

  loadAudio = async (elem, params) => {
    let backgroundAudio = elem
    backgroundAudio.volume = params.volume;
    if (typeof(params.src) !== 'undefined') {
      backgroundAudio.src = params.src
      backgroundAudio.load()
    } else {
      backgroundAudio.play()
    }
  }

  startAudio = (elem, params) => {
    console.log(elem.id)
    let backgroundAudio = elem
    backgroundAudio.volume = params.volume;
    backgroundAudio.play()
  }
  
  createAndStartAudio = (audioFile) => {
    var self = this;
    const flush = new Audio(audioFile)
    flush.volume= 1.0
    flush.play()
    flush.onended = () => {
      flush.remove()
    }
  }

  isReady = () => {
    if ( this.state.homeDefender !== defaultPlayer &&
    this.state.homeStriker !== defaultPlayer &&
    this.state.awayDefender !== defaultPlayer &&
    this.state.awayStriker !== defaultPlayer ) {
      setTimeout( () => {
        this.createAndStartAudio(getRootUrl() + '/sound/ready.ogg')
        }, 500 )
      return true
    } else {
      return false
    }
  }

  onSave = async () => {
    const scoreAndBadges = this.calculateScoreAndBadges()
    const match = {
      teamHome: {
        defender: {
          _id: this.state.homeDefender._id,
          points: this.state.homeDefender.points
        },
        striker: {
          _id: this.state.homeStriker._id,
          points: this.state.homeStriker.points
        },
        score: this.state.homeGoals,
        defScore: scoreAndBadges.homeGoalsDefender,
        strScore: scoreAndBadges.homeGoalsStriker,
        defBadges: [],
        strBadges: []
      },
      teamAway: {
        defender: {
          _id: this.state.awayDefender._id,
          points: this.state.awayDefender.points
        },
        striker: {
          _id: this.state.awayStriker._id,
          points: this.state.awayStriker.points
        },
        score: this.state.awayGoals,
        defScore: scoreAndBadges.awayGoalsDefender,
        strScore: scoreAndBadges.awayGoalsStriker,
        defBadges: [],
        strBadges: []
      },
      badges: scoreAndBadges.badges
    }
    await addNewMatch(match)

    Router.push('/')
  }

  render () {
    return (
      <Layout>
        <GridList
          cols={2}
        >
          <MatchPlayerHeader
            enableScore={this.state.showScores}
            onScoreChange={this.onScoreChange}
            selector={'homeGoals'}
            teamLabel={'Team Home'}
          />
          <MatchPlayerSelection
            player={this.state.homeDefender}
            selectionHandler={this.showPlayersSelect('homeDefender')}
            hoverHandler={() => { this.createAndStartAudio(getRootUrl() + '/sound/hoverEffect.ogg') } }
          />
          <MatchPlayerSelection
            player={this.state.homeStriker}
            selectionHandler={this.showPlayersSelect('homeStriker')}
            hoverHandler={() => { this.createAndStartAudio(getRootUrl() + '/sound/hoverEffect.ogg') } }
          />
          <ReactAudioPlayer
            id="background_audio"
            onEnded={( async (e) => { 
                        this.loadAudio(
                          e.target, 
                          { 
                            src: this.getBackgroundAudio(),
                            volume: 0.3
                          }
                        ).then(() => { 
                          this.startAudio(e.target, { volume: 0.3 }) 
                        }) 
                      })
                    }
          />
          <MatchPlayerHeader
            enableScore={this.state.showScores}
            onScoreChange={this.onScoreChange}
            selector={'awayGoals'}
            teamLabel={'Team Away'}
          />
          <MatchPlayerSelection
            player={this.state.awayDefender}
            selectionHandler={this.showPlayersSelect('awayDefender')}
            hoverHandler={() => { this.createAndStartAudio(getRootUrl() + '/sound/hoverEffect.ogg') } }
          />
          <MatchPlayerSelection
            player={this.state.awayStriker}
            selectionHandler={this.showPlayersSelect('awayStriker')}
          />
          {/* { this.state.homeDefenderSelected && this.state.homeStrikerSelected && this.state.awayDefenderSelected && this.state.awayStrikerSelected && */}
          {((this.state.homeGoals > 5 && (this.state.homeGoals - this.state.awayGoals) > 1) ||
            (this.state.awayGoals > 5 && (this.state.awayGoals - this.state.homeGoals) > 1)) &&
          <GridListTile cols={2} style={{height: 'auto', width: '100%', textAlign: 'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSave}
            >
              Save
            </Button>
          </GridListTile>
          }
        </GridList>
        {
          this.state.showSelectionList &&
          this.state.playersList &&
          <PinnedSubheaderList
            playersList={this.state.playersList}
            onSelectPlayer={this.onSelectPlayer}
            hoverHandler={() => { this.createAndStartAudio(getRootUrl() + '/sound/hoverEffect.ogg') } }
          />
        }
      </Layout>
    )
  }
}


AddMatch.getInitialState = async function getInitialProps () {
  try {
    const players = await getUsersList()
    return {
      playersList: players
    }
  } catch (err) {
    console.log(err)
    return {
      playersList: []
    }
  }
}


export default AddMatch
