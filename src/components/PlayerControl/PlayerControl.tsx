import styles from "@/components/PlayerControl/PlayerControl.module.css"
import classNames from "classnames";

type PlayerControlProps = {
  isPlaying: boolean,
  isLooped: boolean,
  isMixed: boolean,
  onPlay: () => void,
  onPrev: () => void,
  onNext: () => void,
  onLoop: () => void,
  onMix: () => void,
}

const PlayerControls = ({isPlaying, isLooped, isMixed, onPlay, onNext, onPrev, onLoop, onMix}: PlayerControlProps) => {
  const icon = isPlaying ? "pause" : "play"
  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev} onClick={onPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-prev"/>
        </svg>
      </div>
      <div className={styles.playerBtnPlay} onClick={onPlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref={`img/icon/sprite.svg#icon-${icon}`}/>
        </svg>
      </div>
      <div className={styles.playerBtnNext} onClick={onNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-next"/>
        </svg>
      </div>
      <div className={classNames(styles.playerBtnRepeat, {[styles.active]: isLooped})} onClick={onLoop}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-repeat"/>
        </svg>
      </div>
      <div className={classNames(styles.playerBtnShuffle, {[styles.active]: isMixed})} onClick={onMix}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"/>
        </svg>
      </div>
    </div>
  )
}

export default PlayerControls
