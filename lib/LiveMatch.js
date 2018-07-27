
const customPalette = {
    away: 'rgba(236, 236, 11, 0.8)',
    home: 'rgba(16, 108, 224, 0.8)'
}

const styleAwayActualScore = {
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
}

const stylePlayer = url => ({
    background: `url(${url ? url : 'placeholderToBeImported'}) center center no-repeat`,
    backgroundSize: 'cover',
    height: '45vh',
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

const stylePlayerDivider = {
  backgroundColor: '#fff',
  height: '2px',
  position: 'absolute',
  width: '100%',
  zIndex: 0
}

const stylePlayerDivider1 = {
  ...stylePlayerDivider,
  top: '312px',
}

const stylePlayerDivider2 = {
  ...stylePlayerDivider,
  top: '340px',
}

const stylePlayerInfo = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  float: 'left',
  height: '22px',
  lineHeight: '22px',
  margin: 0,
  padding: '0 20px',
  position: 'absolute',
  zIndex: '2'
}

const stylePlayerAka = {
  ...stylePlayerInfo,
  bottom: '0px',
  left: '-10px',
  width: 'calc(100% - 90px)',
}

const stylePlayerName = {
  ...stylePlayerInfo,
  bottom: '27px',
  fontWeight: '700',
  left: '-10px',
  width: 'calc(100% - 60px)',
}

const stylePlayerRole = {
  backgroundColor: '#fff',
  borderRadius: '50%',
  boxSizing: 'content-box',
  fontSize: '28px',
  lineHeight: '50px',
  padding: '20px',
  position: 'absolute',
  textAlign: 'center',
  top: '-20px',
  width: '50px'
}

const stylePlayerRoleD = {
  ...stylePlayerRole,
  left: '-20px',
}

const stylePlayerRoleS = {
  ...stylePlayerRole,
  right: '-20px',
}

const stylePlayerPosition = {
  ...stylePlayerInfo,
  bottom: '27px',
  right: '-10px',
  width: '70px'
}

const stylePlayerScore = {
  ...stylePlayerInfo,
  bottom: '0px',
  right: '-10px',
  textAlign: 'center',
  width: '100px'
}

const stylePlayerNameAway = {
    ...stylePlayerName,
    backgroundColor: customPalette.away,
    bottom: 0,
    color: '#333'
}

const stylePlayerNameHome = {
    ...stylePlayerName,
    color: customPalette.home,
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

const styleScoreButton = {
  borderRadius: 0,
  color: 'rgba(0, 0, 0, 0.54)',
  fontSize: '30px',
  height: '100%',
  textAlign: 'center',
  transition: 'none',
  padding: 0,
  position: 'absolute',
  top: 0,
  width: '50%',
  zIndex: '1',
}

const styleAddScoreButton = {
  ...styleScoreButton,
  left: 'initial',
  right: 0,
}

const styleAddScoreIcon = {

}

const styleRemoveScoreButton = {
  ...styleScoreButton,
  left: 0,
}

const styleRemoveScoreIcon = {

}

const styleTimerIcon = {
    fontSize: '40px'
}

module.exports = {
    styleAddScoreButton,
    styleAddScoreIcon,
    styleAwayActualScore,
    stylePlayer,
    stylePlayerAka,
    stylePlayerBarAway,
    stylePlayerBarHome,
    stylePlayerDivider1,
    stylePlayerDivider2,
    stylePlayerName,
    stylePlayerPosition,
    stylePlayerRoleD,
    stylePlayerRoleS,
    styleRemoveScoreButton,
    stylePlayerScore,
    styleRemoveScoreIcon,
    styleTimer,
    styleTimerButton,
    styleTimerIcon
}
