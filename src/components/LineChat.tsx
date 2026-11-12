import type { ChatData, ChatMessage } from "../types";
import "./LineChat.css";

export interface LineChatProps {
  /** 對話資料（格式見 src/types.ts） */
  data: ChatData;
  /** 畫面寬度，預設 390 */
  width?: number;
  /** 畫面高度，預設 780；設成 "auto" 會全部展開不捲動（方便截長圖） */
  height?: number | "auto";
}

const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

/** "2024/5/8" → "2024.5.8 (三)" */
function formatDate(str: string): string {
  const m = str.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!m) return str;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const day = new Date(y, mo - 1, d).getDay();
  return `${y}.${mo}.${d} (${WEEK[day]})`;
}

const AVATAR_COLORS = ["#7BA7D9", "#E3A86B", "#9CC28A", "#C897C9", "#E58B8B", "#6FBFB5"];

function colorFor(name: string): string {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) return <img className="lc-avatar" src={src} alt={name} />;
  return (
    <div className="lc-avatar" style={{ background: colorFor(name) }}>
      {name[0] ?? "?"}
    </div>
  );
}

interface MessageProps {
  msg: ChatMessage;
  isMe: boolean;
  /** 是否為同一人連續發話的第一則（顯示頭像、名字、泡泡尾巴） */
  showHead: boolean;
  avatar?: string;
}

function Message({ msg, isMe, showHead, avatar }: MessageProps) {
  const meta = (
    <div className="lc-meta">
      {isMe && msg.read !== false && <span>已讀</span>}
      {msg.time && <span>{msg.time}</span>}
    </div>
  );

  if (isMe) {
    return (
      <div className="lc-row lc-me">
        {meta}
        <div className={`lc-bubble lc-bubble-me ${showHead ? "lc-tail" : ""}`}>{msg.text}</div>
      </div>
    );
  }

  return (
    <div className="lc-row lc-other">
      <div className="lc-avatar-slot">{showHead && <Avatar name={msg.from} src={avatar} />}</div>
      <div className="lc-col">
        {showHead && <div className="lc-name">{msg.from}</div>}
        <div className="lc-line">
          <div className={`lc-bubble lc-bubble-other ${showHead ? "lc-tail" : ""}`}>{msg.text}</div>
          {meta}
        </div>
      </div>
    </div>
  );
}

export default function LineChat({ data, width = 390, height = 780 }: LineChatProps) {
  const { me, avatars = {}, sections = [] } = data;

  const others = new Set<string>();
  sections.forEach((s) => s.messages.forEach((m) => m.from !== me && others.add(m.from)));
  const title = data.title ?? [...others].join("、");

  return (
    <div className="lc-phone" style={{ width, height }}>
      <header className="lc-header">
        <span className="lc-back">‹</span>
        <span className="lc-title">{title}</span>
        <span className="lc-icons">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M6.6 3.5h2.6l1.4 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6c0 1.2-1 2.1-2.2 2A16.5 16.5 0 0 1 4.5 5.7c-.1-1.2.9-2.2 2.1-2.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </header>

      <main className="lc-body">
        {sections.map((sec, si) => (
          <section key={si}>
            <div className="lc-date">
              <span>
                {formatDate(sec.date)}
                {sec.label && <em>　{sec.label}</em>}
              </span>
            </div>
            {sec.messages.map((m, mi) => {
              const prev = sec.messages[mi - 1];
              return (
                <Message
                  key={mi}
                  msg={m}
                  isMe={m.from === me}
                  showHead={!prev || prev.from !== m.from}
                  avatar={avatars[m.from]}
                />
              );
            })}
          </section>
        ))}
      </main>

      <footer className="lc-input">
        <span className="lc-plus">＋</span>
        <span className="lc-ico">◎</span>
        <span className="lc-ico">▣</span>
        <div className="lc-field">Aa</div>
        <span className="lc-ico">☺</span>
        <span className="lc-ico">🎙︎</span>
      </footer>
    </div>
  );
}
