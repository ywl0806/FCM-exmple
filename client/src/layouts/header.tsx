import { useState } from "react";
import { NoticeIcon } from "../noticeIcon";

export const Header = () => {
  const [count, setcount] = useState(0);
  return (
    <header className="mb-[2rem] h-[5rem] w-full bg-[#222831]">
      <div className="flex h-full justify-between align-middle">
        <h1 className="my-auto mx-5 text-[3rem] text-white">🔥🔥🔥📮🔥🔥🔥</h1>
        <NoticeIcon count={count} setCount={setcount} position="right-0" />
      </div>
    </header>
  );
};
