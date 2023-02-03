import axios from "axios";
import { requestForToken } from "./firebaseInit";

export const subscription = async () => {
  const token = await requestForToken();

  await axios.post("http://localhost:3030/subscription", {
    token,
  });
};
