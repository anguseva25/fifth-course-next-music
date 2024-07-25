import styles from "@/components/PlayerControl/PlayerControl.module.css"


const PlayerControls = () => {
  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-prev"/>
        </svg>
      </div>
      <div className={styles.playerBtnPlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-play"/>
        </svg>
      </div>
      <div className={styles.playerBtnNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-next"/>
        </svg>
      </div>
      <div className={styles.playerBtnRepeat}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-repeat"/>
        </svg>
      </div>
      <div className={styles.playerBtnShuffle}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"/>
        </svg>
      </div>
    </div>
  )
}

export default PlayerControls
