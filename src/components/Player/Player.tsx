import styles from "@/components/PlayerControl/PlayerControl.module.css"


const Player = () => {
  return (
    <div className="player__track-play track-play">
      <div className="track-play__contain">
        <div className="track-play__image">
          <svg className="track-play__svg">
            <use xlinkHref="img/icon/sprite.svg#icon-note"/>
          </svg>
        </div>
        <div className="track-play__author">
          <a className="track-play__author-link" href="http://">
            Ты та...
          </a>
        </div>
        <div className="track-play__album">
          <a className="track-play__album-link" href="http://">
            Баста
          </a>
        </div>
      </div>
      <div className="track-play__like-dis">
        <div className="track-play__like _btn-icon">
          <svg className="track-play__like-svg">
            <use xlinkHref="img/icon/sprite.svg#icon-like"/>
          </svg>
        </div>
        <div className="track-play__dislike _btn-icon">
          <svg className="track-play__dislike-svg">
            <use xlinkHref="img/icon/sprite.svg#icon-dislike"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Player
