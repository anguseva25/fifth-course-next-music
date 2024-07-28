import SideBar from "@components/SideBar/SideBar";
import Bar from "@components/Bar/Bar";
import Playlist from "@components/Playlist/Playlist";
import Nav from "@components/Nav/Nav";
import Search from "@components/Search/Search";
import Filter from "@components/Filter/Filter";


export default function Home() {
  const tumbler = true
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav/>
          <div className="main__centerblock centerblock">
            <Search/>
            <h2 className="centerblock__h2">Треки</h2>
            <Filter/>
            <Playlist/>
          </div>
          <SideBar/>
        </main>
        <Bar/>
        <footer className="footer"/>
      </div>
    </div>
  );
}
