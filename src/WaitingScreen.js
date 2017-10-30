import React from 'react';
import PropTypes from 'prop-types';
import './WaitingScreen.css';

/**
 * WaitingScreen receives text props and renders
 * simple window with text.
 */
const WaitingScreen = (props) => {
  return (
    <div className='waiting-screen'>
      {props.text}
    </div>
  )
}

WaitingScreen.propTypes = {
  text: PropTypes.string
}

export default WaitingScreen;