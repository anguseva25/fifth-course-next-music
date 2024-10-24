'use client'

import classNames from "classnames";
import styles from "./Filter.module.css";
import {TrackType} from "@/types/track";
import {FilterItem} from "@components/Filter/FilterItems/FilterItem";
import {useState} from "react";
import {getUniqueValues} from "@/utilities/getUniqueValue";

const SORT_OPTIONS = ["По умолчанию", "Сначала новые", "Сначала старые"];

type FilterProps = {
  tracks: TrackType[]
}
const Filter = ({tracks}: FilterProps) => {
  const [activeFilter, setIsActiveFilter] = useState<string | null>(null);
  const uniqueAuthors = getUniqueValues(tracks, "author");
  const uniqueGenre = getUniqueValues(tracks, "genre");
  const handleFilter = (filterName: string) => {
    setIsActiveFilter((previousFilter) => (previousFilter === filterName ? null : filterName));
  }

    return (
        <div className={classNames(styles.centerBlockFilter, styles.filter)}>
          <div className={styles.filterTitle}>Искать по:</div>
          <FilterItem filterId="author" title={"Исполнителю"} isActive={activeFilter === "Исполнителю"} list={uniqueAuthors} handleFilter={handleFilter}/>
          <FilterItem filterId="year" title={"Году выпуска"} isActive={activeFilter === "Году выпуска"} list={SORT_OPTIONS} handleFilter={handleFilter}/>
          <FilterItem filterId="genre" title={"Жанру"} isActive={activeFilter === "Жанру"} list={uniqueGenre} handleFilter={handleFilter}/>
        </div>
    )
}

export default Filter
