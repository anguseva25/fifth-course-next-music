"use client"

import Image from "next/image";
import classNames from "classnames";
import styles from "./Nav.module.css";
import { useState } from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {logout} from "@/store/features/userSlice";


const Nav = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleQuit() {
    dispatch(logout());
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
            <Link href="/tracks" className={styles.menuLink}>
              Главное
            </Link>
          </li>
          {
            tokens.access ? (
              <>
                <li className={styles.menuItem}>
                  <Link href="/tracks/favorites" className={styles.menuLink}>
                    Мой любимый плейлист
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="#" className={styles.menuLink} onClick={handleQuit}>
                    Выйти
                  </Link>
                </li>
              </>
            ) : (
              <li className={styles.menuItem}>
                <Link href="/authorization-In" className={styles.menuLink}>
                  Войти
                </Link>
              </li>
            )
          }
        </ul>
      </div>
      }
    </nav>
  )
}

export default Nav
