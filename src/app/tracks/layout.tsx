import SideBar from "@components/SideBar/SideBar";
import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";
import Search from "@components/Search/Search";
import {CurrentTrackProvider} from "@/contexts/CurrentTrackProvider";

interface Props {
  children: React.ReactNode
}

export default async function Home({children}: Readonly<Props>) {

  return (
    <div className="wrapper">
      <div className="container">
        <CurrentTrackProvider>
          <main className="main">
            <Nav/>
            <div className="main__centerblock centerblock">
              <Search/>
              {children}
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
