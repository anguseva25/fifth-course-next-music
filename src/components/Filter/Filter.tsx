import classNames from "classnames";
import styles from "./Filter.module.css";


const Filter = () => {
    return (
        <div className={classNames(styles.centerBlockFilter, styles.filter)}>
            <div className={styles.filterTitle}>Искать по:</div>
            <div className={classNames(styles.filterButton,styles.buttonAuthor,styles._btnText)}>исполнителю</div>
            <div className={classNames(styles.filterButton,styles.buttonYear,styles._btnText)}>году выпуска</div>
            <div className={classNames(styles.filterButton,styles.buttonGenre,styles._btnText)}>жанру</div>
        </div>
    )
}

export default Filter
