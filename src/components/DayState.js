import React from 'react';
import doneIcon from '../assets/done.png';
import grayIcon from '../assets/gray.png';
import unfinishedIcon from '../assets/unfinished.png';

function DayState({ isDone }) {
  let image;
  if (isDone === true) {
    image = <img src={doneIcon} alt="Done Icon" height={20} width={20}/>
  } else if (isDone === false){
    image = <img src={unfinishedIcon} alt="Unfinished Icon" height={20} width={20}/>
  } else if (isDone === undefined) {
    <img src={grayIcon} alt="Gray Icon" height={20} width={20}/>
  }

  return (
    <div className="flex items-center justify-center h-9">
      {image}
    </div>
  )
}

export default DayState;