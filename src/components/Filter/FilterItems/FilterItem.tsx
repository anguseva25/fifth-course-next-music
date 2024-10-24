import classNames from "classnames";
import styles from "@components/Filter/Filter.module.css";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {FilterOptionsType, setFilters} from "@/store/features/playlistSlice";
import {SortOptions} from "@/types/track";


type FilterItemProps = {
  filterId: FilterOptionsType
  title: string
  isActive: boolean
  list: string[]
  handleFilter: (filterName: string) => void
}

const sortKeys: Record<SortOptions, string> = {
  "": "По умолчанию",
  "возр": "Сначала старые",
  "убыв": "Сначала новые",
};

export function FilterItem({ filterId, title, isActive, list, handleFilter }: FilterItemProps) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.playlist.filterOptions[filterId]);

  function handleClick() {
    handleFilter(title)
  }

  function handleSelectFilter(e: React.MouseEvent<HTMLLIElement>) {
    const item = (e.target as HTMLLIElement).innerText;
    if (filterId === "year") {
      if (item === "По умолчанию")
        dispatch(setFilters({ year: "" }))
      else if (item === "Сначала новые")
        dispatch(setFilters({ year: "убыв" }))
      else
        dispatch(setFilters({ year: "возр" }))
    } else {
      if (filter.includes(item))
        dispatch(setFilters({ [filterId]: filter.filter((el: string) => el !== item) }))
      else
        dispatch(setFilters({ [filterId]: [...filter, item] }))
    }
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText, {[styles.active]: isActive || filter.length })} onClick={handleClick}>{title}</div>

      {
        filter.length > 0 && filterId !== "year" ? (
          <div className={styles.filterCounter}>{filter.length}</div>
        ) : null
      }

      { isActive && (
        <div className={styles.filterPopup}>
          <ul className={styles.filterList}>
            {list.map((item, index) => {
              const isActive = (filter.length && filter.includes(item)) ||
                sortKeys[filter as SortOptions] === item

              return (
                <li key={index} className={classNames(styles._btnText, {[styles.active]: isActive})} onClick={handleSelectFilter}>{item}</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>)
}
