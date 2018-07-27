const ledSize = '24px'

const styleLedBox = {
    height: ledSize,
    margin: '10px 0',
    width: ledSize
}

const styleLedText = {
    fontSize: '12px',
    margin: '16px',
    textAlign: 'center'
}

const styleLed = {
    borderRadius: '50%',
    margin: '0 auto',
    height: ledSize,
    width: ledSize
}

const styleLedRed = {
    ...styleLed,
    backgroundColor: '#F00',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px',
    animation: 'blinkRed 0.5s infinite',
    '@keyframes blinkRed': {
        '0%': {
            backgroundColor: '#F00'
        },
        '50%': {
            backgroundColor: '#A00',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0'
        },
        '100%': {
            backgroundColor: '#F00'
        }
    }
}

const styleLedGreen = {
    ...styleLed,
    backgroundColor: '#ABFF00',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px',
}

const styleLedBlue = {
    ...styleLed,
    backgroundColor: '#24E0FF',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #006 0 -1px 9px, #3F8CFF 0 2px 14px',
}

const styleLedYellow = {
    ...styleLed,
    backgroundColor: '#FF0',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px',
}

module.exports = {
    styleLedBlue,
    styleLedBox,
    styleLedGreen,
    styleLedRed,
    styleLedText,
    styleLedYellow
}  

  
  