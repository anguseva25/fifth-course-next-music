"use client"

import PageContent from "@components/PageContent/PageContent";
import {useAppSelector} from "@/hooks";


export default function FavoritesPage() {
  const {likedTracks} = useAppSelector((state) => state.playlist);

  return (
    <PageContent thereAreAllTracks={false} tracks={likedTracks} errMessage={""} title={"Избранные Треки"}/>
  );
}
