"use client";

import styles from "../autorization.module.css";
import React, { useState } from "react";
import {createUser, getTokens, getUser} from "@/store/features/userSlice";
import {FormDataType} from "@/types/user";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    username: "",
  });

  // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   queryFn();
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const queryFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await dispatch(createUser(formData)).unwrap();
      await dispatch(getTokens(formData)).unwrap();

      router.push("/");
    } catch (error: unknown) {
      if (error && (error instanceof Error || typeof error === "object" && error.name === 'Error'))
        setError(error.message);
      else
        setError("Неизвестная ошибка");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form action="#" className={styles.modalFormLogin}>
            <Link href="/tracks">
              <div className={styles.modalLogo}>
                <Image
                  alt="logo"
                  src="/img/logo_modal.png"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              onChange={handleChange}
              className={classNames(styles.modalInput, styles.login)}
              value={formData.email}
              name="email"
              placeholder="Почта"
              type="text"
            />
            <input
              onChange={handleChange}
              className={styles.modalInput}
              value={formData.password}
              name="password"
              placeholder="Пароль"
              type="password"
            />
            <input
              onChange={handleChange}
              className={styles.modalInput}
              value={formData.username}
              name="username"
              placeholder="Имя пользователя"
              type="text"
            />
            <p className={styles.error}>{error && error}</p>
            <button
              onClick={queryFn}
              className={classNames(
                styles.modalBtnEnter,
                styles.modalBtnEnterText
              )}
            >
              <span>Зарегистрироваться</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
