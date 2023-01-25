import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const DevicePermissionSafe = ({ children }: Props) => {
  const [permission, setPermission] = useState(false);

  const reqPermission = () => {
    Notification.requestPermission();
    setPermission(true);
  };
  useEffect(() => {
    if (Notification.permission === "granted") setPermission(true);
  }, []);
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) || !permission)
    return (
      <div className="flex align-middle justify-center">
        <div className="h-[10rem] bg-slate-400 text-center w-[20rem] flex justify-center align-middle p-10">
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
