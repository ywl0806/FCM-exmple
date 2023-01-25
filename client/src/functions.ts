import axios from "axios";
import { Messaging } from "firebase/messaging";
import { requestForToken } from "./firebaseInit";

export const subscription = async (messaging: Messaging) => {
  const token = await requestForToken(messaging);

  await axios.post("http://localhost:3030/subscription", {
    token,
  });
};
