import styles from "@/components/Volume/Volume.module.css";
import classNames from "classnames";

type VolumeProps = {
  audio: HTMLAudioElement | null;
};

const Volume = ({ audio }: VolumeProps) => {
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
            name="range"
          />
        </div>
      </div>
    </div>
  )
}

export default Volume
