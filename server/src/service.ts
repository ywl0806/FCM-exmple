import { Request, Response } from "express";
import { messaging } from "firebase-admin";

const users: Set<string> = new Set<string>();

export const subscribe = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.body ?? {};
  users.add(token);
  console.log("🚀 / subscribe / users", users);

  res.send();
};

interface MessageType {
  title: string;
  body: string;
  imageUrl: string;
}
export const sendMessage = async (req: Request, res: Response) => {
  const { title, body, imageUrl, ...rest }: MessageType = req.body ?? {};

  try {
    const result = await messaging().sendMulticast({
      data: { title, body, imageUrl: imageUrl ?? "", ...rest },
      tokens: [...users.values()],
    });
    console.log("🚀 / result / result", result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }

  res.send();
};
