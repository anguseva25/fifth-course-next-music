"use client"

import classNames from "classnames";
import styles from "@/components/Search/Search.module.css"
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {setFilters} from "@/store/features/playlistSlice";


const Search = () => {
  const dispatch = useAppDispatch();
  const filterText = useAppSelector((state) => state.playlist.filterOptions.searchValue);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(filterText)
  }, [filterText])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    dispatch(setFilters({ searchValue: e.target.value }));
  }

  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"/>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search" value={searchText}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
