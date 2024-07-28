import styles from "@/components/Bar/Bar.module.css";
import Volume from "@/components/Volume/Volume";
import PlayerControls from "@/components/PlayerControl/PlayerControl";
import Player from "@/components/Player/Player";


const Bar = () => {
    return (
        <div className={styles.bar}>
            <div className={styles.barContent}>
                <div className={styles.barPlayerProgress}/>
                <div className={styles.barPlayerBlock}>
                    <div className={styles.barPlayer}>
                        <PlayerControls />
                        <Player />
                    </div>
                    <Volume />
                </div>
            </div>
        </div>)
}

export default Bar
