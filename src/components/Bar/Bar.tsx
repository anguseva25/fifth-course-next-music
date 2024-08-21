'use client'

import styles from "@/components/Bar/Bar.module.css";
import Volume from "@/components/Volume/Volume";
import PlayerControls from "@/components/PlayerControl/PlayerControl";
import Player from "@/components/Player/Player";
import {useCurrentTrack} from "@/contexts/CurrentTrackProvider";
import {useEffect, useRef, useState} from "react";
import ProgressBar from "@components/Bar/ProgressBar/ProgressBar";


const Bar = () => {
    const {currentTrack} = useCurrentTrack();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    if (!currentTrack) {
        return null;
    }

    const handlePlay = (doPlay: boolean = !isPlaying) => {
        setIsPlaying(doPlay);
    }

    const switchPlay = () => {
        const audio = audioRef.current;

        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        setIsPlaying((prev) => !prev);
    }

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value)
        }
    };

    const {name, author, track_file} = currentTrack;
    const duration = audioRef.current?.duration || 0;

    // useEffect(() => {
    //     if (audioRef.current && currentTrack) {
    //         const handleCanPlay = () => {
    //             audioRef.current?.play();
    //             handlePlay(true);
    //         };
    //
    //         audioRef.current.addEventListener("canplay", handleCanPlay);
    //
    //         return () => {
    //             audioRef.current?.removeEventListener("canplay", handleCanPlay);
    //         };
    //     }
    // }, [currentTrack]);

    return (
        <div className={styles.bar}>
            <div className={styles.barContent}>
                <audio
                    className={styles.audio}
                    src={track_file}
                    ref={audioRef}
                    controls />
                <ProgressBar max={duration} value={currentTime} step={0.01} onChange={handleSeek} />
                <div className={styles.barPlayerBlock}>
                    <div className={styles.barPlayer}>
                        <PlayerControls isPlaying={isPlaying} onPlay={switchPlay} />
                        <Player name={name} author={author} />
                    </div>
                    <Volume audio={audioRef.current} />
                </div>
            </div>
        </div>)
}

export default Bar
