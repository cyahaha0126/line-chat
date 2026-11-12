# LINE 模擬對話畫面

用 React + TypeScript 寫的元件：吃一份對話 JSON，渲染出 LINE 風格的聊天畫面。

## 啟動

需要先安裝 [Node.js](https://nodejs.org)（LTS 版）。

```bash
npm install     # 第一次才需要
npm run dev     # 啟動，打開 http://localhost:5173
```

## 檔案結構

```
src/
├── components/
│   ├── LineChat.tsx   ← LINE 畫面元件
│   └── LineChat.css   ← 元件樣式
├── data/
│   └── conversation.json  ← 對話內容（改這裡）
├── types.ts           ← 對話資料的格式定義
└── App.tsx            ← 決定要顯示哪一份對話
```

## 對話 JSON 格式

```json
{
  "title": "聊天室標題（可省略，預設為對方名字）",
  "me": "李燦",
  "avatars": { "柯東昇": "https://example.com/photo.jpg" },
  "sections": [
    {
      "date": "2024/5/8",
      "label": "首次聯絡",
      "messages": [
        { "from": "柯東昇", "time": "上午10:12", "text": "李先生您好……" },
        { "from": "李燦", "time": "上午10:20", "text": "您好……", "read": true }
      ]
    }
  ]
}
```

| 欄位 | 說明 |
| --- | --- |
| `me` | 「自己」是誰，訊息會是綠色泡泡、靠右 |
| `title` | 聊天室標題，可省略 |
| `avatars` | 頭像網址，可省略（沒給就顯示名字首字） |
| `sections[].date` | 日期，自動顯示成 `2024.5.8 (三)` |
| `sections[].label` | 日期旁的小標，可省略 |
| `messages[].time` | 時間，可省略 |
| `messages[].read` | 自己的訊息是否顯示「已讀」，預設顯示，設 `false` 隱藏 |

## 元件用法

```tsx
import LineChat from "./components/LineChat";
import data from "./data/conversation.json";

<LineChat data={data} />                  // 預設 390 × 780，可捲動
<LineChat data={data} width={375} />      // 自訂寬度
<LineChat data={data} height="auto" />    // 全部展開，方便截長圖
```
