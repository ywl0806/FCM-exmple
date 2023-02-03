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

  return (
    <div className="max-h-[30rem] overflow-auto rounded-3xl border-[0.2rem] border-gray-500 bg-[#222831] pb-[2rem] pt-[1rem] text-white">
      {/iPhone|iPad|iPod/.test(navigator.userAgent) || !permission ? (
        <div className="flex justify-center pt-3">
          <Button
            variant="contained"
            color="info"
            className="h-[5rem]"
            onClick={reqPermission}
          >
            <span className="">通知を受信する</span>
          </Button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
