import {TrackType} from "@/types/track";
import {getAllTracks} from "@/API/getAllTracks";
import PageContent from "@components/PageContent/PageContent";


export default async function Home() {
  let tracks: TrackType[] = [];
  let errMessage: string = "";

  try {
    tracks = await getAllTracks()
  } catch (error: unknown) {
    errMessage =
      error instanceof Error
        ? "Возникли проблемы при загрузке треков: " + error.message
        : "Неизвестная ошибка";
  }

  return (
    <PageContent allTracks={tracks} tracks={tracks} errMessage={errMessage} title={"Треки"}/>
  );
}
