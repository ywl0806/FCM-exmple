import { NoticeDataType } from "./types/notice";

const noticeBroadcast = new BroadcastChannel("ch-notice");
const NOTICE_MESSAGES = "notice_messages";
export const gettingIt = async () => {
  noticeBroadcast.postMessage({ type: "getMessages" });
};

export const saveMessages = (data: NoticeDataType[]) => {
  localStorage.setItem(NOTICE_MESSAGES, JSON.stringify(data ?? []));
};

export const getMessages = (): NoticeDataType[] => {
  const item = localStorage.getItem(NOTICE_MESSAGES);
  if (item) return JSON.parse(item);
  return [];
};

export const deleteMessage = (id: string) => {
  const items = localStorage.getItem(NOTICE_MESSAGES);
  const list: NoticeDataType[] = JSON.parse(items ?? "[]");

  const newList = list.filter((item) => item.id !== id);

  localStorage.setItem(NOTICE_MESSAGES, JSON.stringify(newList));
};
export default noticeBroadcast;
