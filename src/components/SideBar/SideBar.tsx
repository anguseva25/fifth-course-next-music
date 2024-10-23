'use client'

import Image from "next/image";
import styles from "./SideBar.module.css";
import {logout} from "@/store/features/userSlice";
import {useAppDispatch, useAppSelector} from "@/hooks";
import useInitializeLikedTracks from "@/hooks/useInitializeLikedTracks";
import Link from "next/link";


const SideBar = () => {
  useInitializeLikedTracks();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  function handleQuit() {
    dispatch(logout());
  }

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>
          {user?.username}
        </p>
        <div className={styles.sidebarIcon} onClick={handleQuit}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"/>
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/catalogue/2">
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist01.png" width={250} height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/catalogue/3">
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist02.png" width={250} height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/catalogue/4">
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist03.png" width={250} height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
