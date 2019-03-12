import getRootUrl from '../../lib/api/getRootUrl'

const createAndStartAudio = (audioFile) => {
  if (process.browser) {
    const flush = new Audio(audioFile)
    flush.volume= 1.0
    flush.play()
    flush.onended = () => {
      flush.remove()
    }
  }
}


export const audioActions = {
  playerSelect: () => createAndStartAudio(getRootUrl() + '/sound/player_selection.aac'),
  matchReady: () => createAndStartAudio(getRootUrl() + '/sound/ready.aac'),
  matchGo: () => createAndStartAudio(getRootUrl() + '/sound/go.aac'),
  scorePerfect: () => createAndStartAudio(getRootUrl() + '/sound/perfect.aac')
}
