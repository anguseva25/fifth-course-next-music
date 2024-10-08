import SideBar from "@components/SideBar/SideBar";
import Bar from "@components/Bar/Bar";
import PlayList from "@components/Playlist/Playlist";
import Nav from "@components/Nav/Nav";
import Search from "@components/Search/Search";
import Filter from "@components/Filter/Filter";
import {TrackType} from "@/types/track";
import {getAllTracks} from "@/API/getAllTracks";
import {CurrentTrackProvider} from "@/contexts/CurrentTrackProvider";


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
    <div className="wrapper">
      <div className="container">
        <CurrentTrackProvider>
          <main className="main">
            <Nav/>
            <div className="main__centerblock centerblock">
              <Search/>
              <h2 className="centerblock__h2">Треки</h2>
              <Filter tracks={tracks}/>
              <PlayList errors={errMessage} tracks={tracks}/>
            </div>
            <SideBar/>
          </main>
          <Bar/>
        </CurrentTrackProvider>
        <footer className="footer"/>
      </div>
    </div>
  );
}
