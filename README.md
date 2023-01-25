# Firebase Cloud Message example

### npm install

```bash
/server npm install
/client npm install
```

## sdk 設定

1. プロジェクト作成後 Firebase console でアプリを追加
2. プロジェクトの設定 -> 全般 -> マイアプリ -> SDK の設定と構成
3. firebaseConfig 内容をコピー

### client/src/firebaseInit.ts

```ts
...

const firebaseConfig = {
 //コピーした内容をここにペースト
};
...
```

1. プロジェクトの設定 -> サービス アカウント -> Firebase Admin SDK -> 新しい秘密鍵を生産
2. ダウンロードされた json ファイルを`server/`の中のとこかにに入れる

### server/src/app.ts

```ts
...
import * as serviceAccount from "path/to/生産した秘密鍵.json";// <- ここ

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

...
```

## 立ち上げ

```
server/ npm run dev:server
client/ npm run start
```

## ENDPOINT

- `/subscription` push を受け取るため token を保存
- `/send-message` message を push service に送信
