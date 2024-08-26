import styles from "@/components/PlayerControl/PlayerControl.module.css"
import classNames from "classnames";

type PlayerControlProps = {
  isPlaying: boolean,
    isLooped: boolean,
  onPlay: () => void,
  onLoop: () => void,
  onDo: () => void,
}

const PlayerControls = ({isPlaying, isLooped, onPlay, onLoop, onDo}: PlayerControlProps) => {
  const icon = isPlaying ? "pause" : "play"
  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev} onClick={onDo}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-prev"/>
        </svg>
      </div>
      <div className={styles.playerBtnPlay} onClick={onPlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref={`img/icon/sprite.svg#icon-${icon}`}/>
        </svg>
      </div>
      <div className={styles.playerBtnNext} onClick={onDo}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-next"/>
        </svg>
      </div>
      <div className={classNames(styles.playerBtnRepeat, {[styles.active]: isLooped})} onClick={onLoop}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-repeat"/>
        </svg>
      </div>
      <div className={styles.playerBtnShuffle} onClick={onDo}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"/>
        </svg>
      </div>
    </div>
  )
}

export default PlayerControls
