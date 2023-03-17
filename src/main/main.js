// main.js

import React from 'react';
import './main.css';

function Main() {


  const openTwitter = () => {
    window.open("https://twitter.com/intent/tweet?text=I%27m%20applying%20for%20the%20Octopus%20Pass%20waitlist.%20See%20you%20on%20%40OctopusFi%0D%0A&original_referer");
  }

  return (
    <div className='wrap'>
      <div className='title'>
        <h1> JOIN THE OCTOPUS FI </h1>
      </div>

      <div className='paragraph'>
        <p> Octupus Fi is a fast and innovative DaaS Vision on the Arbitrum Network.
        Earn passive income up to 1,612% APR.</p>
      </div>
      <div className='buttons'>
        <button onClick={openTwitter}>APPLY FOR WAITLIST</button>
      </div>
    </div>
  );
}

export default Main;
