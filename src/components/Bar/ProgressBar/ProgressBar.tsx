import styles from "./ProgressBar.module.css";
import React from "react";

type ProgressBarProps = {
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ProgressBar = ({ max, value, onChange }: ProgressBarProps) => {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min={0}
      max={max}
      value={value}
      step={0.01}
      onChange={onChange}
    />
  );
}

export default React.memo(ProgressBar);
