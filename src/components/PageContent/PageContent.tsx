"use client"
import PlayList from "@components/Playlist/Playlist";
import Filter from "@components/Filter/Filter";
import {TrackType} from "@/types/track";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {clearFilters, setInitialPlaylist, setVisiblePlaylist} from "@/store/features/playlistSlice";
import {useAppSelector} from "@/hooks";

type Props = {
  allTracks: TrackType[] | null,
  tracks: TrackType[],
  errMessage: string,
  title: string,
};

export default function PageContent({allTracks, tracks, errMessage, title}: Props) {
  const dispatch = useDispatch();
  const {visiblePlaylist, filteredTracks} = useAppSelector((state) => state.playlist);

  useEffect(() => {
    if (allTracks)
      dispatch(setInitialPlaylist(allTracks));
    dispatch(setVisiblePlaylist(tracks));
    dispatch(clearFilters())
  }, [allTracks, tracks]);

  return (
    <>
      <h2 className="centerblock__h2">{title}</h2>
      <Filter tracks={visiblePlaylist}/>
      <PlayList errors={errMessage} tracks={filteredTracks}/>
    </>
  );
}
