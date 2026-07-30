import { useState, useEffect } from 'react'

const initialAuctions = [
  { name: '원피스 루피 기어5 스케일 피규어', price: 42000, secondsLeft: 192 },
  { name: '명일방주 텍사스 스케일 피규어', price: 128000, secondsLeft: 720 },
  { name: '에반게리온 초합금 로봇혼', price: 310000, secondsLeft: 2400 },
  { name: '건담 RX-78-2 PG 프라모델', price: 95000, secondsLeft: 3600 },
]

const suspicious = [
  { t: '12:41:02', msg: 'user_k22 → 본인 등록 상품에 입찰 시도 (차단됨)' },
  { t: '12:35:47', msg: 'user_h91 → 90초 내 7회 연속 입찰 (모니터링 대상 등록)' },
]

const logs = [
  { t: '12:44:10', msg: 'user_m03 로그인 성공 (Seoul)' },
  { t: '12:43:52', msg: '관리자 alarm: CPU 사용률 82% 도달 (auto-scaling 트리거)' },
  { t: '12:41:30', msg: '비정상 접근 시도 차단 — IP 203.0.113.44' },
]

function fmtTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function AdminDashboard() {
  const [bidCount, setBidCount] = useState(1284)
  const [activeUsers, setActiveUsers] = useState(312)
  const [elapsed, setElapsed] = useState(0)
  const [auctions, setAuctions] = useState(initialAuctions)
  const [claims, setClaims] = useState([
    { name: '상품 미배송 신고', user: 'user_a15', status: '대기' },
    { name: '상품 상태 불일치', user: 'user_c92', status: '처리중' },
    { name: '낙찰 후 대금 미결제', user: 'user_b77', status: '완료' },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((e) => e + 1)

      setAuctions((prev) =>
        prev.map((a) => (a.secondsLeft > 0 ? { ...a, secondsLeft: a.secondsLeft - 1 } : a))
      )

      if (Math.random() < 0.35) {
        setAuctions((prev) => {
          const idx = Math.floor(Math.random() * prev.length)
          const bump = (Math.floor(Math.random() * 5) + 1) * 1000
          return prev.map((a, i) => (i === idx ? { ...a, price: a.price + bump } : a))
        })
        setBidCount((c) => c + 1)
      }

      setActiveUsers((u) => Math.max(0, u + Math.floor(Math.random() * 7 - 3)))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const advanceClaim = (i) => {
    const order = ['대기', '처리중', '완료']
    setClaims((prev) =>
      prev.map((c, idx) => {
        if (idx !== i) return c
        const next = order[Math.min(order.indexOf(c.status) + 1, order.length - 1)]
        return { ...c, status: next }
      })
    )
  }

  const statusBadge = (s) => {
    if (s === '완료') return <span className="badge2 muted">완료</span>
    if (s === '처리중') return <span className="badge2 warn">처리중</span>
    return <span className="badge2">대기</span>
  }

  return (
    <div className="page-wrap">
      <div className="topbar">
        <div className="logo">CloudDuck <span style={{ fontWeight: 400, fontSize: 11, color: '#8C8C8C' }}>Admin</span></div>
        <div className="live-label"><span className="live-dot" />실시간 연결됨 · 마지막 갱신 {elapsed}초 전</div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="label">오늘 입찰 건수</div>
          <div className="value">{bidCount.toLocaleString()}</div>
          <div className="delta">실시간 갱신</div>
        </div>
        <div className="stat">
          <div className="label">실시간 접속자</div>
          <div className="value">{activeUsers.toLocaleString()}</div>
          <div className="delta">WebSocket 연결 수 기준</div>
        </div>
        <div className="stat">
          <div className="label">이상 입찰 탐지</div>
          <div className="value">{suspicious.length}</div>
          <div className="delta">최근 1시간</div>
        </div>
      </div>

      <div className="grid2">
        <div className="panel">
          <div className="panel-head">
            <span className="t">실시간 경매 사이트 리스트</span>
            <span className="live-label"><span className="live-dot" />LIVE</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 18px', fontSize: 10.5, color: '#8C8C8C', textTransform: 'uppercase', borderBottom: '1px solid #EDEDED' }}>상품명</th>
                <th style={{ textAlign: 'left', padding: '10px 18px', fontSize: 10.5, color: '#8C8C8C', textTransform: 'uppercase', borderBottom: '1px solid #EDEDED' }}>현재가</th>
                <th style={{ textAlign: 'left', padding: '10px 18px', fontSize: 10.5, color: '#8C8C8C', textTransform: 'uppercase', borderBottom: '1px solid #EDEDED' }}>남은시간</th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((a, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 18px', borderBottom: '1px solid #F5F5F5' }}>{a.name}</td>
                  <td style={{ padding: '10px 18px', borderBottom: '1px solid #F5F5F5', fontWeight: 700 }}>{a.price.toLocaleString()}원</td>
                  <td style={{ padding: '10px 18px', borderBottom: '1px solid #F5F5F5' }}>{fmtTime(a.secondsLeft)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-head"><span className="t">이상 입찰 하이라이트</span></div>
          <div className="log-list">
            {suspicious.map((s, i) => (
              <div className="log-row" key={i}>
                <span>{s.msg}</span>
                <span className="t">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="panel">
          <div className="panel-head"><span className="t">분쟁 및 클레임 관리</span></div>
          <div>
            {claims.map((c, i) => (
              <div className="claim-row" key={i}>
                <span>{c.name} <span style={{ color: '#B5B5B5' }}>· {c.user}</span></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {statusBadge(c.status)}
                  <button className="act-btn" onClick={() => advanceClaim(i)}>처리</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><span className="t">시스템 및 보안/로그</span></div>
          <div className="log-list">
            {logs.map((l, i) => (
              <div className="log-row" key={i}>
                <span>{l.msg}</span>
                <span className="t">{l.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="page-note">
        * 값은 시뮬레이션 데이터입니다. 실제 연동 시 각 위젯을 5~10초 폴링 또는 WebSocket 구독으로 교체하세요.
      </p>
    </div>
  )
}
