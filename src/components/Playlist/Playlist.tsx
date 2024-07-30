import Track from "@/components/Track/Track";
import styles from "@/components/Playlist/Playlist.module.css";
import classNames from "classnames";
import {TrackType} from "@/types/track";
import css from "styled-jsx/css";

type PlayListProps = {
  tracks: TrackType[]
  errors: string
}
const PlayList = ({tracks, errors}: PlayListProps) => {
  return (
    <div className={classNames(styles.centerblockContent, styles.playlistContent)}>
      <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"/>
          </svg>
        </div>
      </div>
      <div className={classNames(styles.contentPlaylist, styles.playlist)}>
        {errors ?
          <h4 className={styles.error}>{errors}</h4>
         : tracks.map((track) => <Track track={track} key={track.id} />)}
      </div>
    </div>
  )
}

export default PlayList
