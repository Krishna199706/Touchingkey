import React, { useState, useEffect } from 'react';
import './index.css'

const TouchAccuracy = () => {
  const keysToType = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keysPressed, setKeysPressed] = useState(0);
  const [correctKeyPresses, setCorrectKeyPresses] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // Update accuracy percentage
  useEffect(() => {
    if (keysPressed > 0) {
      const accuracyPercentage = ((correctKeyPresses / keysPressed) * 100).toFixed(2);
      setAccuracy(accuracyPercentage);
    }
  }, [correctKeyPresses, keysPressed]);

  // Handle key press event
  const handleKeyPress = (event) => {
    const typedKey = event.key.toLowerCase();

    if (typedKey === keysToType[currentKeyIndex]) {
      setCurrentKeyIndex((prevIndex) => prevIndex + 1);
      setCorrectKeyPresses((prevCount) => prevCount + 1);
    }

    setKeysPressed((prevCount) => prevCount + 1);
  };

  // Set up key press event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentKeyIndex]);

  // Render the next keys to type
  const renderNextKeys = () => {
    const nextKeys = keysToType.slice(currentKeyIndex, currentKeyIndex + 3).join(' ');
    return <div className="next-keys">{nextKeys}</div>;
  };

  return (
    <div className="typing-practice">
      <h1 className="title">Typing Practice</h1>
      <div className="next-keys-container">{renderNextKeys()}</div>
      <div className="letterCard">
      <p>Keys Pressed: {keysPressed}</p>
      </div>
      <div className="letterCard">
      <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  );
};

export default TouchAccuracy;