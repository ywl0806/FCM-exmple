import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const DevicePermissionSafe = ({ children }: Props) => {
  const [permission, setPermission] = useState(false);

  const reqPermission = () => {
    Notification.requestPermission().then((result) => {
      if (result === "granted") setPermission(true);
    });
  };
  useEffect(() => {
    if (Notification.permission === "granted") setPermission(true);
  }, []);
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) || !permission)
    return (
      <div className="flex justify-center align-middle">
        <div className="flex h-[10rem] w-[20rem] justify-center bg-slate-400 p-10 text-center align-middle">
          <Button
            variant="contained"
            className="h-[5rem]"
            onClick={reqPermission}
          >
            <span className="">通知を受信する</span>
          </Button>
        </div>
      </div>
    );

  return <>{children}</>;
};
