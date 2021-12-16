import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
    const [nootRetry, setNootRetry] = useState(0);
    const [nootBuffer, setNootBuffer] = useState(null);
    const [nootContext, setNootContext] = useState(null);
    const [suckCount, setSuckCount] = useState([]);

    useEffect(() => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        const context = new window.AudioContext();
        setNootContext(context);
        const userAgent = navigator.userAgent || navigator.vendor;
        const preventFirst = false; // Create and Initialize the Audio Context

        var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
        getSound.open("GET", "ssd.mp3", true); // Path to Audio File
        getSound.responseType = "arraybuffer"; // Read as Binary Data
        getSound.onload = function () {
            context.decodeAudioData(getSound.response, function (buffer) {
                setNootBuffer(buffer);
            });
        };
        getSound.send(); // Send the Request and Load the File
    }, []);
    const playSSD = async () => {
        if (nootContext) {
            setSuckCount(suckCount.concat(1));
            var playSound = nootContext.createBufferSource(); // Declare a New Sound
            playSound.buffer = nootBuffer; // Attatch our Audio Data as it's Buffer
            playSound.connect(nootContext.destination); // Link the Sound to the Output
            playSound.start
                ? playSound.start(nootContext.currentTime)
                : playSound.noteOn(nootContext.currentTime); // Play the Sound
        } else {
            if (nootRetry < 5) {
                setNootRetry(nootRetry + 1);
                await new Promise((resolve) => setTimeout(resolve, 200));
                playNoot();
            } else {
                console.error("Can't noot, sorry :(");
            }
        }
    };

    return (
        <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div
                className="h-screen w-screen flex flex-wrap text-center"
                onClick={playSSD}
            >
                {suckCount.length != 0 ? (
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                        <span className="bg-slate-50 p-3 text-slate-600 rounded shadow-2xl">
                            Your love for Elias:{" "}
                            <span className="bg-gradient-to-r to-emerald-500 from-pink-600 text-transparent bg-clip-text text-5xl">
                                {suckCount.length}
                            </span>
                        </span>
                    </h1>
                ) : (
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                        <span className="bg-slate-50 p-3 text-slate-600 rounded shadow-2xl">
                            START CLICKING TO LOVE ELIAS
                        </span>
                    </h1>
                )}
                {suckCount.map(() => (
                    <video loop autoPlay muted className="w-1/8 h-1/2">
                        <source src="kissfinal.mp4" type="video/mp4" />
                    </video>
                ))}
            </div>
        </body>
    );
}
