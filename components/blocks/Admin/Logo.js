import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  firstCircle: {
    transformOrigin: '50% 50% 0px',
    animationName: 'move-first-circle, color-mutation',
    animationDuration: '4s, 7s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  secondCircle: {
    transformOrigin: '50% 50% 0px',
    animationName: 'move-second-circle, color-mutation',
    animationDuration: '4s, 8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  '@keyframes color-mutation': {
    '0%': {
      stroke: 'magenta'
    },
    '33%': {
      stroke: 'cyan'
    },
    '66%': {
      stroke: 'yellow'
    },
    '100%': {
      stroke: 'magenta'
    }
  },
  '@keyframes move-first-circle': {
    '50%': {
      transform: 'rotate3d(0, 2, 1, 180deg)'
    },
    '100%': {
      transform: 'rotate3d(0, 2, 1, 360deg)'
    }
  },
  '@keyframes move-second-circle': {
    '50%': {
      transform: 'rotate3d(2, 0, 1, 180deg)'
    },
    '100%': {
      transform: 'rotate3d(2, 0, 1, 360deg)'
    }
  }
})

const Logo = ({
  classes
}) =>
  <Link href="/">
    <div
      style={{height: '5rem', width: '5rem', cursor: 'pointer'}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        style={{display: 'block', maxWidth:'100%', margin:0, fill:'none', stroke:'cyan'}}
        vectorEffect="non-scaling-stroke"
      >
        <circle cx="32" cy="32" r="32" fill="#000" fillOpacity="0" stroke="none" />
        <circle
          cx="32"
          cy="32"
          r="30"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        <g>
          <circle
            cx="32"
            cy="32"
            r="24"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className={classes.firstCircle}
          />
          <circle
            cx="32"
            cy="32"
            r="24"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className={classes.secondCircle}
          />
        </g>
        <text
          x="32"
          y="34"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
          fontSize="4"
          stroke="none"
          fill="white"
          style={{textTransform:'uppercase', letterSpacing:'0.5em'}}
        >
          Scoreza
        </text>
      </svg>
    </div>
  </Link>

export default withStyles(styles)(Logo)
