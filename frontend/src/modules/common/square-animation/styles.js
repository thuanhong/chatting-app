import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles({
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '-webkit-perspective': 400,
    perspective: 400,
  },

  plane: {
    width: 120,
    height: 120,
    '-webkit-transform-style': 'preserve-3d',
    transformStyle: 'preserve-3d',
    '&.main': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      transform: 'rotateX(90deg) rotateZ(-30deg)',
      animation: '$rotate 20s infinite linear',
      '& .circle': {
        width: 120,
        height: 120,
        position: 'absolute',
        '-webkit-transform-style': 'preserve-3d',
        transformStyle: 'preserve-3d',
        boxSizing: 'border-box',
        boxShadow: (props) => `0 0 60px ${props.color}, inset 0 0 60px ${props.color}`,
        '&:nth-child(1)': {
          transform: 'translateZ(-60px)',
        },
        '&:nth-child(2)': {
          transform: 'rotateX(90deg) translateX(0px) translateY(9px) translateZ(60px) translateY(-9px)',
        },
        '&:nth-child(3)': {
          transform: 'rotateY(90deg) translateZ(-60px) translateY(0px) translateX(0px)',
        },
        '&:nth-child(4)': {
          transform: 'rotateY(-90deg) rotateX(90deg) translateZ(-60px) translateX(0px)',
        },
        '&:nth-child(5)': {
          transform: 'translateZ(60px)',
        },
        '&:nth-child(6)': {
          transform: 'rotateY(90deg) translateZ(60px) translateY(0px) translateX(0px)',
        },
      },
      '& .circle::before,& .circle::after': {
        content: '',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: '10%',
        height: '10%',
        background: (props) => props.color,
        boxSizing: 'border-box',
      },
      '& img::after': {
        content: '',
        display: 'block',
        animation: '$rotate 20s infinite linear reverse',
      },
    },
  },

  '@keyframes rotate': {
    '0%': {
      transform: 'rotateX(0) rotateY(0) rotateZ(0)',
    },
    '100%': {
      transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
    },
  },
});
