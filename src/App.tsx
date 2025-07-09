import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    // Initialize audio element - try timer.mp3 first, then tick.mp3
    audioRef.current = new Audio('./timer.mp3');
    audioRef.current.volume = 0.5; // Increased volume to 50%
    audioRef.current.preload = 'auto';
    
    // Test audio loading
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully');
      setAudioError(null);
    });
    
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', './timer.mp3');
      // Try tick.mp3 as fallback
      if (audioRef.current) {
        audioRef.current.src = './timer.mp3';
        audioRef.current.load();
      }
      setAudioError('Audio file not found or cannot be loaded');
    });
    
    // Try to load the audio
    audioRef.current.load();
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (currentAudioPromise.current) {
        currentAudioPromise.current = null;
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1;
          
          // Play tick sound only when timer is running AND sound is enabled
          if (isRunning && isSoundEnabled && audioRef.current) {
            try {
              // Stop any currently playing audio first
              stopAudio();
              
              // Reset audio to start and play
              audioRef.current.currentTime = 0;
              currentAudioPromise.current = audioRef.current.play();
              
              if (currentAudioPromise.current !== undefined) {
                currentAudioPromise.current.catch(error => {
                  console.error('Audio play failed:', error);
                  setAudioError('Audio playback failed - check browser settings');
                });
              }
            } catch (error) {
              console.error('Audio error:', error);
              setAudioError('Audio playback error');
            }
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      // Stop audio when component unmounts or timer stops
      stopAudio();
    };
  }, [isRunning, isSoundEnabled]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    stopAudio(); // Immediately stop any playing audio
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    stopAudio(); // Immediately stop any playing audio
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (!isSoundEnabled) {
      stopAudio(); // Stop audio if sound is being disabled
    }
  };

  const testAudio = () => {
    if (audioRef.current) {
      stopAudio(); // Stop any current audio first
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Test audio failed:', error);
        setAudioError('Audio test failed');
      });
    }
  };

  return (
    <div className="App">
      <div className="timer-container">
        <button 
          className={`sound-toggle ${isSoundEnabled ? 'enabled' : 'disabled'}`}
          onClick={toggleSound}
          title={isSoundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {isSoundEnabled ? '🔊' : '🔇'}
        </button>
        <h1>Digital Timer</h1>
        <div className="time-display">
          {formatTime(elapsedTime)}
        </div>
        <div className="controls">
          <button 
            className={`control-btn ${isRunning ? 'disabled' : 'start'}`}
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button 
            className={`control-btn ${!isRunning ? 'disabled' : 'stop'}`}
            onClick={handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button 
            className="control-btn reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        {audioError && (
          <div className="audio-error">
            <p>{audioError}</p>
            <button onClick={testAudio} className="test-audio-btn">
              Test Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
