/** 單則訊息 */
export interface ChatMessage {
  /** 發話者名字，需與 ChatData.me 或其他人名一致 */
  from: string;
  /** 訊息內容，可用 \n 換行 */
  text: string;
  /** 顯示時間，例如「上午10:12」（可省略） */
  time?: string;
  /** 自己的訊息是否顯示「已讀」，預設 true */
  read?: boolean;
}

/** 一天（或一段）的對話 */
export interface ChatSection {
  /** 日期，例如 "2024/5/8"，會顯示成「2024.5.8 (三)」 */
  date: string;
  /** 日期旁的小標，例如「首次聯絡」（可省略） */
  label?: string;
  messages: ChatMessage[];
}

/** LineChat 元件吃的整份對話資料 */
export interface ChatData {
  /** 聊天室標題，省略時自動用對方名字 */
  title?: string;
  /** 「自己」是誰：綠色泡泡、靠右 */
  me: string;
  /** 頭像圖片網址，key 是人名；沒給就用名字首字 */
  avatars?: Record<string, string>;
  sections: ChatSection[];
}
