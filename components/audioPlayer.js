import ReactAudioPlayer from 'react-audio-player'
import { withStyles } from '@material-ui/core/styles'
import getRootUrl from '../lib/api/getRootUrl'

import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import MuteIcon from '@material-ui/icons/VolumeOff'
import UnmuteIcon from '@material-ui/icons/VolumeUp'
import ReplayIcon from '@material-ui/icons/Replay'
import NextIcon from '@material-ui/icons/SkipNext'

const interval = 500

const styles = theme => ({
    audioPlayer: {
        display: 'block',
        width: '427px',
        margin: 'auto',
        padding: '2px 2px 1px 2px',
        backgroundColor: 'black',
        border: '2px solid darkgreen',
        borderRadius: '9px',
        marginTop: '30px'
    },
    progress: {
        color: 'green',
        fontSize: '12px',
        width: '220px',
        height: '12px',
        border: 'none',
        marginRight: '10px',
        background: '#434343',
        borderRadius: '9px'
    }
})

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPause: false,
      isMute: false,
      player: {},
      progress: {},
      percent: 0,
      backgroundSoundTracks: [
        'standby.aac',
        'theKingOfFighters.aac',
        'ESAKA.aac',
        'BurningD.N.A.aac',
        'DangerousToys.aac',
        'SadisticEyes.aac',
        'KD0079.aac'
      ],
      currentSoundTrack: -1
    }
  }

  async componentDidMount () {
    let player = document.getElementById('background_audio')
    let progress = document.getElementById('progress-bar')
    this.setState({
      player: player,
      progress: progress
    })
    try {
      await this.loadAudio(player, { src: this.getBackgroundAudio(), volume: 1.0 }).then(() => {
        this.startAudio(player, { volume: 1.0 })
      })
    } catch (err) {
      console.log(err)
    }
  }

  startAudio = (elem, params) => {
    let backgroundAudio = elem
    backgroundAudio.volume = params.volume;
    backgroundAudio.play()
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
    
  getBackgroundAudio = () => {
    this.state.currentSoundTrack++
    if(this.state.backgroundSoundTracks.length <= this.state.currentSoundTrack) {
      this.state.currentSoundTrack = 0
    }
    return getRootUrl() + '/sound/' + this.state.backgroundSoundTracks[this.state.currentSoundTrack]
  }

  seek = (event, offsetX) => {
    if (this.state.player.src) {
      var player = this.state.player
      var progressBar = this.state.progress
      var percent = offsetX / progressBar.offsetWidth
      player.currentTime = percent * player.duration
      // Update the progress bar's value
      percent = percent / 100
      this.setState({
        percent: percent,
        player: player
      })
    }
  }

  playPauseAudio = () => {
    var isPause = this.state.isPause
    this.setState({
      isPause: !isPause
    })
    
    if (this.state.player.src) {
      if (this.state.player.paused || this.state.player.ended) {
        this.state.player.play();
      }
      else {
        this.state.player.pause();
      }
    }
  }

  updateProgress = () => {
    var player = this.state.player
    var progressBar = this.state.progress
    var percent = player.currentTime / player.duration
    // Update the progress bar's value
    percent = percent * 100
    console.log('ACTUAL', player.currentTime)
    console.log('TOTAL', player.duration)
    console.log('PERCENT', percent)
    this.setState({
      percent: percent
    })
  }

  // Stop the current media from playing, and return it to the start position
  stopAudio = () => {
    if (this.state.player.src) {
      this.state.player.pause();
      this.setState({
        isPause: true
      })
      if (this.state.player.currentTime) this.state.player.currentTime = 0;
    }
  }

  // Toggles the media player's mute and unmute status
  muteVolume = () => {
    var isMute = this.state.isMute
    this.setState({
      isMute: !isMute
    })
    if (this.state.player.src) {
      if (this.state.player.muted) {
        this.state.player.muted = false;
      }
      else {
        this.state.player.muted = true;
      }
    }
  }

  // Replays the media currently loaded in the player
  replayAudio = () => {
    if (this.state.player.src) {
      this.stopAudio()
      this.state.player.play()
      this.setState({
        isPause: false
      })
    }
  }

  nextAudio = async () => {
    this.loadAudio(
      this.state.player,
      {
          src: this.getBackgroundAudio(),
          volume: 0.3
      }
    ).then(() => {
      this.startAudio(this.state.player, { volume: 0.3 })
    })
  }

  render (props) {
      return (
      <div >
        <ReactAudioPlayer
            id="background_audio"
            listenInterval={ interval }
            onListen={() => { this.updateProgress() }}
            onEnded={this.nextAudio}
            // onPause={}
            // onPlay={}
        />
        <div id="audio_player" className={this.props.classes.audioPlayer}>
            <progress id='progress-bar' min='0' max='100' value={this.state.percent} className={this.props.classes.progress} onClick={(e) => { this.seek(e, e.nativeEvent.offsetX) }}>0% played</progress>
            <button accessKey="P" onClick={this.playPauseAudio}>
              { (this.state.isPause) ? 
                <PlayIcon {...props}/>
                : 
                <PauseIcon {...props}/>
              }
            </button>
            <button accesskey="X" onClick={this.stopAudio}><StopIcon {...props}/></button>
            <button accesskey="R" onClick={this.replayAudio}><ReplayIcon {...props}/></button>
            <button accesskey="N" onClick={this.nextAudio}><NextIcon {...props}/></button>
            <button onClick={this.muteVolume}>
              { (this.state.isMute) ? 
                <MuteIcon {...props}/>
                : 
                <UnmuteIcon {...props}/>
              }
            </button>
        </div>
      </div>
      )
  }

}
export default withStyles(styles)(AudioPlayer)