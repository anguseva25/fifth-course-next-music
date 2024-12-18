"use client"
import styles from "@components/Player/Player.module.css"
import classNames from "classnames";
import {useLikeTrack} from "@/hooks/useLikeTrack";
import {TrackType} from "@/types/track";

type PlayerProps = {
  track: TrackType,
}

const Player = ({track}: PlayerProps) => {
  const {name, author} = track
  const { isLiked, handleLike } = useLikeTrack(track)

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
            {author}
          </a>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={classNames(styles.trackPlayLike, styles._btnIcon)} onClick={handleLike}>
          <svg className={classNames(styles.trackPlayLikeSvg, {[styles.active]: isLiked})}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Player
