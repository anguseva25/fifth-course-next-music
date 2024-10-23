"use client"

import PageContent from "@components/PageContent/PageContent";
import {useAppSelector} from "@/hooks";
import {useEffect} from "react";
import {redirect} from "next/navigation";


export default function FavoritesPage() {
  const {likedTracks} = useAppSelector((state) => state.playlist);
  const {tokens} = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!tokens.access) redirect('/tracks');
  }, [tokens.access]);

  return (
    <PageContent allTracks={null} tracks={likedTracks} errMessage={""} title={"Избранные Треки"}/>
  );
}
