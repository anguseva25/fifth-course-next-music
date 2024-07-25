import Image from "next/image";
import styles from "./SideBar.module.css"


const SideBar = () => {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>
          Sergey.Ivanov
        </p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout"/>
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist01.png" width={250} height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a
              className={styles.sidebarLink}
              href="#"
            >
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist02.png" width={250} height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a
              className={styles.sidebarLink}
              href="#"
            >
              <Image
                alt="day's playlist"
                className={styles.sidebarImg}
                src="/img/playlist03.png" width={250} height={150}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
