import React,{Fragment} from 'react';
import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = (props) => {

  return (

        <CircularProgressbar
        className="percent-inner"
        value={props.number}
        text={`${props.number}%`}
      />

  )
}

export default ProgressCircle;
