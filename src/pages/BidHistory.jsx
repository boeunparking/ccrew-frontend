import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav.jsx";

const initialItems = [
  {
    id: 1,
    name: "원피스 루피 기어5 스케일 피규어",
    seller: "seller_otaku",
    myBid: 42000,
    price: 44000,
    secondsLeft: 187,
  },
  {
    id: 2,
    name: "명일방주 텍사스 스케일 피규어",
    seller: "seller_myethos",
    myBid: 120000,
    price: 132000,
    secondsLeft: 715,
  },
  {
    id: 3,
    name: "에반게리온 초합금 로봇혼",
    seller: "seller_evafig",
    myBid: 300000,
    price: 310000,
    secondsLeft: 2395,
  },
  {
    id: 4,
    name: "귀멸의칼날 넨도로이드 네즈코",
    seller: "seller_nendo",
    myBid: 76000,
    price: 76000,
    secondsLeft: 0,
    ended: true,
  },
];

function fmtTime(sec) {
  if (sec <= 0) return "종료";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function statusOf(item) {
  if (item.ended) return { label: "낙찰완료", cls: "done" };
  if (item.price <= item.myBid) return { label: "최고가", cls: "top" };
  return { label: "경쟁중", cls: "mid" };
}

export default function BidHistory() {
  const [items, setItems] = useState(initialItems);
  const [flashId, setFlashId] = useState(null);
  const flashTimeout = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        let next = prev.map((it) => ({
          ...it,
          secondsLeft:
            !it.ended && it.secondsLeft > 0
              ? it.secondsLeft - 1
              : it.secondsLeft,
        }));
        if (Math.random() < 0.35) {
          const candidates = next.filter((it) => !it.ended);
          if (candidates.length) {
            const target =
              candidates[Math.floor(Math.random() * candidates.length)];
            const bump = (Math.floor(Math.random() * 4) + 1) * 1000;
            next = next.map((it) =>
              it.id === target.id ? { ...it, price: it.price + bump } : it,
            );
            setFlashId(target.id);
            clearTimeout(flashTimeout.current);
            flashTimeout.current = setTimeout(() => setFlashId(null), 700);
          }
        }
        return next;
      });
    }, 1500);
    return () => {
      clearInterval(timer);
      clearTimeout(flashTimeout.current);
    };
  }, []);

  const totalCount = items.length;
  const leadCount = items.filter(
    (it) => !it.ended && it.price <= it.myBid,
  ).length;
  const competingCount = items.filter(
    (it) => !it.ended && it.price > it.myBid,
  ).length;
  const closingSoon = items.filter(
    (it) => !it.ended && it.secondsLeft <= 600,
  ).length;

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 24px 0",
        }}
      >
        <div
          style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700 }}
        >
          입찰 내역
        </div>
        <div className="live-label">
          <span className="live-dot" />
          실시간 반영 중
        </div>
      </div>

      <div className="summary" style={{ margin: "20px 24px 0" }}>
        <div className="cell">
          <div className="label">참여 중</div>
          <div className="value">{totalCount}</div>
        </div>
        <div className="cell">
          <div className="label">최고가</div>
          <div className="value">{leadCount}</div>
        </div>
        <div className="cell">
          <div className="label">경쟁중</div>
          <div className="value">{competingCount}</div>
        </div>
        <div className="cell">
          <div className="label">마감임박</div>
          <div className="value">{closingSoon}</div>
        </div>
      </div>

      <div className="tickerlist">
        {items.map((item) => {
          const diff = item.price - item.myBid;
          const st = statusOf(item);
          return (
            <div
              key={item.id}
              className={`tl-row ${flashId === item.id ? "flash-row" : ""}`}
            >
              <div className="tl-info">
                <div className="tl-name">{item.name}</div>
                <div className="tl-seller">{item.seller}</div>
              </div>
              <div className="tl-price">
                <div className="tl-current mono">
                  {item.price.toLocaleString()}원{" "}
                  {diff > 0 && <span className="arrow-up">▲</span>}
                </div>
                <div className="tl-sub">
                  {diff === 0
                    ? "최고가 유지 중"
                    : `내 입찰가보다 ${diff.toLocaleString()}원 높음`}
                </div>
              </div>
              <div className="tl-time mono">{fmtTime(item.secondsLeft)}</div>
              <span className={`badge3 ${st.cls}`}>{st.label}</span>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 11, color: "#B5B5B5", margin: "16px 24px" }}>
        ▲ = 나보다 높은 입찰 발생 · 가격 변동 시 잠깐 강조 표시됩니다
      </p>
    </div>
  );
}
