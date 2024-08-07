import styles from "@components/Player/Player.module.css"
import classNames from "classnames";

type PlayerProps = {
  name:string,
  author:string,
  album:string
}

const Player = ({name, author}: PlayerProps) => {
  return (
    <div className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"/>
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <a className={styles.trackPlayAuthorLink} href="http://">
            {name}
          </a>
        </div>
        <div className={styles.trackPlayAlbum}>
          <a className={styles.trackPlayAlbumLink} href="http://">
            Баста
          </a>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={classNames(styles.trackPlayLike, styles._btnIcon)}>
          <svg className={styles.trackPlayLikeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"/>
          </svg>
        </div>
        <div
          className={classNames(styles.trackPlayDislike, styles._btnIcon)}
        >
          <svg className={styles.trackPlayDislikeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-dislike"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Player
