import { Button, Fade } from "@mui/material";
import axios from "axios";
import { getMessaging, Messaging } from "firebase/messaging";
import { useState, useEffect } from "react";
import { onMessageListener, requestForToken } from "./firebaseInit";
import { subscription } from "./functions";

interface NoticeDataType {
  id: string;
  title: string;
  body: string;
  imgUrl?: string;
}

export const Notification = () => {
  const [noticeList, setNoticeList] = useState<NoticeDataType[]>([]);
  const [arrive, setArrive] = useState(false);
  const messaging = getMessaging();

  onMessageListener(messaging)
    .then((payload) => {
      setArrive(true);

      const arrivedNotice: NoticeDataType = {
        id: payload.messageId,
        title: payload.data?.title ?? "",
        body: payload.data?.body ?? "",
        imgUrl: payload.data?.imgUrl ?? "",
      };

      const list = [...noticeList];

      list.push(arrivedNotice);

      setNoticeList(list);
    })
    .catch((err) => console.log("failed: ", err));

  const deleteNotice = (key: string) => {
    const list = noticeList.filter((not) => key !== not.id);
    setNoticeList(list);
  };
  useEffect(() => {
    subscription(messaging);
  }, []);
  return (
    <div>
      {noticeList.map((notice) => {
        return (
          <Fade key={notice.id} in={arrive}>
            <div
              className={`text-center mx-auto bg-slate-100  w-[23rem] rounded-3xl
							shadow-lg border-2 p-[1.2rem] my-[0.5rem]`}
            >
              <h1 className="text-2xl font-bold text-left text-[#00ADB5]">
                {notice.title}
              </h1>
              <p className="mt-[1rem] text-1xl">{notice.body}</p>
              {notice.imgUrl ? (
                <img width={50} height={50} src={notice.imgUrl} />
              ) : (
                <></>
              )}
              <div className="text-right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteNotice(notice.id)}
                >
                  x
                </Button>
              </div>
            </div>
          </Fade>
        );
      })}
    </div>
  );
};
