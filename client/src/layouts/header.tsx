import { useState } from "react";
import { NoticeIcon } from "../noticeIcon";

export const Header = () => {
  const [count, setcount] = useState(0);
  return (
    <header className="mb-[2rem] max-h-[10rem] min-h-[5rem] w-full bg-[#222831] py-1 px-3">
      <div className="flex h-full justify-between align-middle">
        <div className="w-1/3"></div>
        <div className="flex w-1/3 justify-center">
          <h1 className="my-auto mx-5  text-[3rem] text-white">
            🔥🔥🔥📮🔥🔥🔥
          </h1>
        </div>
        <div className="flex w-1/3 justify-end">
          <NoticeIcon count={count} setCount={setcount} position="right-0" />
        </div>
      </div>
    </header>
  );
};
