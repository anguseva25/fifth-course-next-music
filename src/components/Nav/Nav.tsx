'use client'

import Image from "next/image";
import classNames from "classnames";
import styles from "./Nav.module.css";
import { useState } from "react";
import {useRouter} from "next/navigation";


const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  function handleLogIn() {
    router.push("/authorization-In");
  }

  return (
    <nav className={classNames(styles.mainNav, styles.nav)}>
      <div className={classNames(styles.navLogo, styles.logo)}>
        <Image
          className={styles.logoImage}
          alt="Skypro logo"
          src="/img/logo.png"
          width={114}
          height={17}
        />
      </div>
      <div onClick={() => setIsOpen((prev) => !prev)} style={{cursor:'pointer'}} className={classNames(styles.navBurger, styles.burger)}>
        <span className={styles.burgerLine}/>
        <span className={styles.burgerLine}/>
        <span className={styles.burgerLine}/>
      </div>
      {isOpen &&
      <div className={classNames(styles.navMenu, styles.menu)}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Мой плейлист
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink} onClick={handleLogIn}>
              Войти
            </a>
          </li>
        </ul>
      </div>
      }
    </nav>
  )
}

export default Nav
