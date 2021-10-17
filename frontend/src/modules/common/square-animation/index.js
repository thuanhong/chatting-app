import React from 'react';
import { useStyles } from './styles';
import classNames from 'classnames';

export const SquareAnimation = (props) => {
  const classes = useStyles(props);
  return (
    <div style={props.style} className={classes.view}>
      <div className={classNames(classes.plane, 'main')}>
        <div className='circle' />
        <div className='circle' />
        <div className='circle' />
        <div className='circle' />
        <div className='circle' />
        <div className='circle' />
        {/* <img className='plane main' style={{ animation: 'none', transform: 'none' }} src='js.png' /> */}
      </div>
    </div>
  );
};
