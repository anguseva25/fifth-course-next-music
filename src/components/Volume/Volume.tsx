import React, {RefObject, useEffect, useState} from "react";
import styles from "@/components/Volume/Volume.module.css";
import classNames from "classnames";

type VolumeProps = {
  audioRef: RefObject<HTMLAudioElement>;
};

const Volume = ({ audioRef }: VolumeProps) => {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef.current]);

  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume"/>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Volume)
