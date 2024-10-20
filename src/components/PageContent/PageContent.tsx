"use client"
import PlayList from "@components/Playlist/Playlist";
import Filter from "@components/Filter/Filter";
import {TrackType} from "@/types/track";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setInitialPlaylist, setVisiblePlaylist} from "@/store/features/playlistSlice";
import {useAppSelector} from "@/hooks";

type Props = {
  thereAreAllTracks: boolean,
  tracks: TrackType[],
  errMessage: string,
  title: string,
};

export default function PageContent({thereAreAllTracks, tracks, errMessage, title}: Props) {
  const dispatch = useDispatch();
  const {visiblePlaylist} = useAppSelector((state) => state.playlist);

  useEffect(() => {
    if (thereAreAllTracks)
      dispatch(setInitialPlaylist(tracks));
    dispatch(setVisiblePlaylist(tracks));
  }, [thereAreAllTracks, tracks]);

  return (
    <>
      <h2 className="centerblock__h2">{title}</h2>
      <Filter tracks={visiblePlaylist}/>
      <PlayList errors={errMessage} tracks={visiblePlaylist}/>
    </>
  );
}
