'use client'

import styles from "@/components/Bar/Bar.module.css";
import Volume from "@/components/Volume/Volume";
import PlayerControls from "@/components/PlayerControl/PlayerControl";
import Player from "@/components/Player/Player";
import {useEffect, useRef, useState} from "react";
import ProgressBar from "@components/Bar/ProgressBar/ProgressBar";
import {formatTime} from "@/utilities/datetime";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {setIsMixed, setIsPlaying, setNextTrack, setPrevTrack} from "@/store/features/playlistSlice";


const Bar = () => {
    const {currentTrack, isPlaying, isMixed} = useAppSelector(state => state.playlist);
    const dispatch = useAppDispatch();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isLooped, setIsLooped] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const duration = audioRef.current?.duration || 0;

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            const handleCanPlay = () => {
                audioRef.current?.play();
                handlePlay(true);
            };

            audioRef.current.addEventListener("canplay", handleCanPlay);

            return () => audioRef.current?.removeEventListener("canplay", handleCanPlay);
        }
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.addEventListener("ended", handleNextTrack);

            return () => audioRef.current?.removeEventListener("ended", handleNextTrack);
        }
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current)
            audioRef.current.loop = isLooped;
    }, [isLooped]);

    const handlePlay = (doPlay: boolean = !isPlaying) => {
        dispatch(setIsPlaying(doPlay));
    }

    const handlePrevTrack = () => {
        dispatch(setPrevTrack());
    }

    const handleNextTrack = () => {
        dispatch(setNextTrack());
    }

    const handleSetMixed = () => {
        dispatch(setIsMixed(!isMixed));
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
        dispatch(setIsPlaying(!isPlaying));
    }

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value)
        }
    };

    const handleLoop = () => {
        setIsLooped(!isLooped);
    }

    if (!currentTrack) {
        return null;
    }

    const {_id, name, author, track_file} = currentTrack;

    return (
        <div className={styles.bar}>
            <div className={styles.barContent}>
                {
                    isPlaying && audioRef.current && (
                        <span className={styles.barTime}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    )
                }
                <audio
                    className={styles.audio}
                    src={track_file}
                    ref={audioRef}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    controls
                />
                <ProgressBar max={duration} value={currentTime} onChange={handleSeek} />
                <div className={styles.barPlayerBlock}>
                    <div className={styles.barPlayer}>
                        <PlayerControls isPlaying={isPlaying} isLooped={isLooped} isMixed={isMixed} onPlay={switchPlay} onNext={handleNextTrack} onPrev={handlePrevTrack} onLoop={handleLoop} onMix={handleSetMixed} />
                        <Player track={currentTrack}/>
                    </div>
                    <Volume audioRef={audioRef} />
                </div>
            </div>
        </div>
    )
}

export default Bar
