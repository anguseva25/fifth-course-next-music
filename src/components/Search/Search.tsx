import classNames from "classnames";
import styles from "@/components/Search/Search.module.css"


const Search = () => {
  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"/>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  )
}

export default Search
