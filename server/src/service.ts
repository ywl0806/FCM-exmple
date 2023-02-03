import { Request, Response } from "express";
import { messaging } from "firebase-admin";

const users: Set<string> = new Set<string>();

export const subscribe = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.body ?? {};
  users.add(token);
  console.log("🚀 / subscribe / users", users);

  res.send();
};

interface AnyType {
  [key: string]: any;
}
interface MessageType extends AnyType {
  title: string;
  body: string;
  imageUrl?: string;
  icon?: string;
  badge?: string;
}
export const sendMessage = async (req: Request, res: Response) => {
  const { title, body, imageUrl, icon, badge, ...rest }: MessageType =
    req.body ?? {};

  try {
    const result = await messaging().sendMulticast({
      notification: { title, body, imageUrl },
      data: { title, body, imageUrl: imageUrl ?? "", ...rest },
      tokens: [...users.values()],
      webpush: {
        notification: {
          title,
          body,
          icon: icon ?? "/pepe.png",
          badge: badge ?? "/doge.jpg",
          actions: [{ action: "/hoge", title: "title" }],
        },
        fcmOptions: { link: "/" },
      },
    });
    console.log("🚀 / result / result", result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }

  res.send();
};
