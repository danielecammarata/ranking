const styleLoadMoreButton = active => ({
    display: active ? 'block' : 'none',
    margin: '0 auto',
})

const styleMatchInfo = {
    height: '24px',
    lineHeight: '24px',
    textAlign: 'center',
}

const styleMatchScore = {
    lineHeight: '70px',
    position: 'relative',
    textAlign: 'center',
    width: '70px',
}

const styleMatchTile = {
    margin: '20px auto',
    height: '110px',
    width: '100%',
}

const stylePlayerScore = (role, team) => ({
    backgorundColor: 'blue',
    left: team=='home' ? '12px' : '54px',
    position: 'absolute',
    top: role=='defender' ? '14px' : '60px',
    zIndex: 1,
})

const styleTeamPlayer = position => ({
    flexDirection: position=='right'? 'row-reverse' : 'initial',
    justifyContent: 'flex-start',
    padding: '0 5px',
    width:'100%'
})

const styleTeamTile = position => ({
    textAlign: position? position : 'left',
    width:'calc(50% - 35px)'
})

module.exports = {
    styleLoadMoreButton,
    styleMatchInfo,
    styleMatchScore,
    styleMatchTile,
    stylePlayerScore,
    styleTeamPlayer,
    styleTeamTile,
}  

  
  