import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [audio, setAudio] = useState(null)

  useEffect(() => {
  setAudio(new Audio("/ssd.mp3"))
  
  }, [])

  const start = () => {
    audio.play()
  }

  return (
    <div className="h-screen w-screen bg-cyan-300" onClick={start}>
      
    </div>
  )
}
