import type {Metadata} from "next";
import React from "react";


interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "SkyPro Music: Favorites",
  description: "Любимая волна",
};

export default async function Favorite({children}: Readonly<Props>) {
  return (
    <>{children}</>
  );
}
