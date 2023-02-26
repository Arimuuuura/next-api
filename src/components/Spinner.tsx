import Image from "next/image";
import { FC } from "react";
import Loading from "@/../public/loading.gif";

export const Spinner: FC = () => {
  return (
    <div className="bg-white fixed inset-0 z-40 flex h-screen w-screen place-items-center justify-center bg-base-100 ">
      <Image
        className="w-full max-w-screen-lg rounded-lg aspect-video my-4"
        src={Loading}
        alt=""
        width={200}
        height={200}
        quality={50}
      />
    </div>
  );
};
