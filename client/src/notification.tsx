import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { getMessaging, onMessage } from "firebase/messaging";
import { useState, useEffect } from "react";
import { DevicePermissionSafe } from "./deviceSafe";
import { onMessageListener } from "./firebaseInit";
import { subscription } from "./functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { NoticeDataType } from "./types/notice";
import noticeBroadcast, {
  deleteMessage,
  getMessages,
  gettingIt,
  saveMessages,
} from "./broadcast";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Notification = ({ count, setCount, setOpen }: Props) => {
  const [noticeList, setNoticeList] = useState<NoticeDataType[]>([]);

  const deleteNotice = (key: string) => {
    const list = noticeList.filter((not) => key !== not.id);
    setNoticeList(list);
    deleteMessage(key);
    if (list.length === 0) {
      setCount(0);
      setOpen(false);
    }
  };

  noticeBroadcast.onmessage = (e) => {
    const datas: NoticeDataType[] = e.data;

    if (datas.length === 0) return;

    const newlist = [...noticeList, ...datas];
    setCount(count + datas.length);
    setNoticeList(newlist);
    saveMessages(newlist);
  };

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        const arrivedNotice: NoticeDataType = {
          id: payload.messageId,
          title: payload.data?.title ?? "",
          body: payload.data?.body ?? "",
          imgUrl: payload.data?.imgUrl ?? "",
        };
        const list = [...noticeList];
        list.push(arrivedNotice);
        setCount((count) => count + 1);
        setNoticeList(list);
        saveMessages(list);
      })
      .catch((err) => console.log("failed: ", err));
  }, [noticeList]);
  gettingIt();
  useEffect(() => {
    window.addEventListener("focus", () => {
      gettingIt();
    });
    const savedList = getMessages();
    setNoticeList(savedList);
    subscription();
  }, []);
  return (
    <DevicePermissionSafe>
      <h1 className=" pl-[2rem] pt-[1rem] text-[1.5rem] font-bold text-white md:text-[2rem]">
        NOTICE
      </h1>
      <List>
        <TransitionGroup>
          {noticeList.map(({ id, title, body, imgUrl }) => (
            <Collapse key={id}>
              <ListItem className="my-[-0.5rem] ">
                <div className="mt-[0.6rem] w-full rounded-3xl bg-slate-600 p-[1rem] ">
                  <div className="flex justify-between">
                    <Avatar
                      src={imgUrl}
                      className="my-auto  bg-slate-600"
                      sx={{ width: 56, height: 56 }}
                    />
                    <div className="ml-[2rem] flex-grow whitespace-pre-wrap break-all text-left">
                      <h1 className="text-[1.3rem] text-white">{title}</h1>
                      <p className="w-full text-[1.1rem] text-gray-400">
                        {body}
                      </p>
                    </div>
                    <IconButton
                      onClick={() => deleteNotice(id)}
                      className="my-auto h-10 w-10 opacity-20 transition-opacity duration-500 ease-out hover:opacity-100"
                      color="error"
                      edge="start"
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </div>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </DevicePermissionSafe>
  );
};
