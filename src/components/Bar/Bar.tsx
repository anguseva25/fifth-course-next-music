'use client'

import styles from "@/components/Bar/Bar.module.css";
import Volume from "@/components/Volume/Volume";
import PlayerControls from "@/components/PlayerControl/PlayerControl";
import Player from "@/components/Player/Player";
import {useCurrentTrack} from "@/contexts/CurrentTrackProvider";


const Bar = () => {
    const {currentTrack} = useCurrentTrack();
    if (!currentTrack) {
        return null;
    }

    const {name, author, album} = currentTrack;
    return (
        <div className={styles.bar}>
            <div className={styles.barContent}>
                <div className={styles.barPlayerProgress}/>
                <div className={styles.barPlayerBlock}>
                    <div className={styles.barPlayer}>
                        <PlayerControls />
                        <Player name={name} author={author} album={album}  />
                    </div>
                    <Volume />
                </div>
            </div>
        </div>)
}

export default Bar
