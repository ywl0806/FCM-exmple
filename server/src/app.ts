import * as express from "express";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { sendMessage, subscribe } from "./service";
import { json } from "body-parser";
import * as serviceAccount from "../auth/serviceAccountKey.json";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});
app.use(cors());
app.use(json()); //json parser
app.post("/subscription", subscribe);
app.post("/send-message", sendMessage);

export default app;
