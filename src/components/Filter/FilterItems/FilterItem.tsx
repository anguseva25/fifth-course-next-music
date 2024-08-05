import classNames from "classnames";
import styles from "@components/Filter/Filter.module.css";
import {TrackType} from "@/types/track";


type FilterItemProps = {
  title: string
  isActive: boolean
  list: string[]
  handleFilter: (filterName: string) => void
}

export function FilterItem({ title, isActive, list, handleFilter }: FilterItemProps) {
  function handleClick() {
    handleFilter(title)
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText, {[styles.active]: isActive })} onClick={handleClick}>{title}</div>
      { isActive && (
        <div className={styles.filterPopup}>
          <ul className={styles.filterList}>
            {list.map((item, index) => {
              return (
                <li key={index} className={styles._btnText}>{item}</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>)
}