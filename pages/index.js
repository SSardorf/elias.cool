import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [audio, setAudio] = useState(null)
  const [nootRetry, setNootRetry] = useState(0);
  const [nootBuffer, setNootBuffer] = useState(null);
  const [nootContext, setNootContext] = useState(null);

  useEffect(() => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
      const context = new window.AudioContext();
      setNootContext(context);
      const userAgent = navigator.userAgent || navigator.vendor;
      const preventFirst = false; // Create and Initialize the Audio Context
  
      var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
      getSound.open('GET', 'ssd.mp3', true); // Path to Audio File
      getSound.responseType = 'arraybuffer'; // Read as Binary Data
      getSound.onload = function() {
        context.decodeAudioData(getSound.response, function(buffer) {
          setNootBuffer(buffer);
        });
      };
      getSound.send(); // Send the Request and Load the File
    }, []);

  const playSSD = async () => {
    if (nootContext) {
      var playSound = nootContext.createBufferSource(); // Declare a New Sound
      playSound.buffer = nootBuffer; // Attatch our Audio Data as it's Buffer
      playSound.connect(nootContext.destination); // Link the Sound to the Output
      playSound.start
        ? playSound.start(nootContext.currentTime)
        : playSound.noteOn(nootContext.currentTime); // Play the Sound
    } else {
      if (nootRetry < 5) {
        setNootRetry(nootRetry + 1);
        await new Promise(resolve => setTimeout(resolve, 200));
        playNoot();
      } else {
        console.error("Can't noot, sorry :(");
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-cyan-300" onClick={playSSD}>
    <p>{}</p>
      
    </div>
  )
}
