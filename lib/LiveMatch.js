
const customPalette = {
    away: 'rgba(236, 236, 11, 0.8)',
    home: 'rgba(16, 108, 224, 0.8)'
}

const stylePlayer = url => ({
    background: `url(${url ? url : 'placeholderToBeImported'}) center center no-repeat`,
    backgroundSize: 'cover',
    height: '30vh',
    padding: 0,
    position: 'relative'
})

const stylePlayerBarAway = {
    backgroundColor: 'transparent',
    top: 0,
    position: 'absolute'
}

const stylePlayerBarHome = {
    backgroundColor: 'transparent',
    bottom: 0,
    position: 'absolute'
}

const stylePlayerName = {
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: '60px',
    margin: 0,
    position: 'absolute',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%'
}

const stylePlayerNameAway = {
    ...stylePlayerName,
    backgroundColor: customPalette.away,
    bottom: 0,
    color: '#333'
}

const stylePlayerNameHome = {
    ...stylePlayerName,
    backgroundColor: customPalette.home,
    color: '#eee',
    top: 0
}

const styleTimer = {
    border: '1px solid',
    borderRadius: '8px',
    fontSize: '22px',
    height: '50px',
    lineHeight: '50px',
    margin: '0 auto',
    textAlign: 'center',
    width: '200px',
}

const styleTimerButton = {
    color: '#333',
    height: '40px',
    width: '33%'
}

const styleAddScoreButton = {
    
}

const styleAddScoreIcon = {
    
}

const styleRemoveScoreButton = {
    
}

const styleRemoveScoreIcon = {
    
}

const styleTimerIcon = {
    fontSize: '40px'
}

module.exports = {
    styleAddScoreButton,
    styleAddScoreIcon,
    stylePlayer,
    stylePlayerBarAway,
    stylePlayerBarHome,
    stylePlayerNameAway,
    stylePlayerNameHome,
    styleRemoveScoreButton,
    styleRemoveScoreIcon,
    styleTimer,
    styleTimerButton,
    styleTimerIcon
}