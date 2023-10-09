import React from 'react';
import doneIcon from '../assets/done.png';
import grayIcon from '../assets/gray.png';
import unfinishedIcon from '../assets/unfinished.png';

function DayStateIcon({ isDone, onClick, ...props }) {
  let image;
  const defaultProps = {
    height: 20,
    width: 20,
    onClick,
    ...props
  }

  if (isDone === true) {
    image = <img src={doneIcon} alt="Done Icon" {...defaultProps}/>
  } else if (isDone === false){
    image = <img src={unfinishedIcon} alt="Unfinished Icon" {...defaultProps}/>
  } else if (isDone === undefined) {
    image = <img src={grayIcon} alt="Gray Icon" {...defaultProps}/>
  }

  return image
}

export default DayStateIcon;