import LineChat from "./components/LineChat";
import type { ChatData } from "./types";
import conversation from "./data/conversation.json";

// 想換成別段對話：把上面的 conversation.json 換成 data 資料夾裡的其他檔案
const data = conversation as ChatData;

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
      <LineChat data={data} />
    </div>
  );
}
