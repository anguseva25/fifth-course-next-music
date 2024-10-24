"use client"

import PageContent from "@components/PageContent/PageContent";
import {useEffect, useState} from "react";
import {TrackType} from "@/types/track";
import {fetchCatalogue, getAllTracks} from "@/API/getAllTracks";

type CatalogueProps = {
  params: { id: string };
};

export default function CataloguePage({ params }: CatalogueProps) {
  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    Promise.all([getAllTracks(), fetchCatalogue(params.id)])
      .then(([allTracks, catalogueData]) => {
        const tracks = allTracks.filter((item) => catalogueData.items.includes(item._id)) //

        setAllTracks(allTracks);
        setTracks(tracks);
        setTitle(catalogueData.name);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrMessage(error.message);
        } else {
          setErrMessage("Неизвестная ошибка")
        }
      })
  }, []);

  return (
    <PageContent allTracks={allTracks} tracks={tracks} errMessage={errMessage} title={title}/>
  );
}
