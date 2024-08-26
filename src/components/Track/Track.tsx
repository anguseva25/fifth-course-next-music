'use client'

import styles from "@/components/Track/Track.module.css";
import classNames from "classnames";
import {TrackType} from "@/types/track";
import {useCurrentTrack} from "@/contexts/CurrentTrackProvider";

type TrackProps = {
  track: TrackType,
}

const Track = ({ track }:TrackProps) => {
  const {setCurrentTrack} = useCurrentTrack();
  const {name, author, album} = track;

  const handleTrackClick = () => {
    setCurrentTrack(track)
  }

  return (
    <div onClick={handleTrackClick} className={classNames(styles.playlistItem)}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"/>
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan}/>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"/>
          </svg>
          <span className={styles.trackTimeText}>4:44</span>
        </div>
      </div>
    </div>
  )
}

export default Track
