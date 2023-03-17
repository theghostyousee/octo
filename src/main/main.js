import React from 'react'
import './main.css'
import Logo from './logo.png'

function main() {

  const handleApplyButtonClick = async () => {
    try {
      const response = await fetch('/api/updateCounter', { method: 'POST' });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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
        <button onClick={handleApplyButtonClick}>APPLY FOR WAITLIST</button>
      </div>
    </div>
  )
}

export default main;
