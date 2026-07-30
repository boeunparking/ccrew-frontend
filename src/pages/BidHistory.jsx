import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav.jsx'

const initialItems = [
  { id: 1, name: '빈티지 필름 카메라', seller: 'seller_hyun', myBid: 42000, price: 42000, secondsLeft: 192, history: [42000, 42000, 42000, 42000, 42000] },
  { id: 2, name: '한정판 스니커즈', seller: 'seller_j', myBid: 120000, price: 128000, secondsLeft: 720, history: [120000, 122000, 124000, 126000, 128000] },
  { id: 3, name: '디자이너 시계', seller: 'seller_watch', myBid: 300000, price: 310000, secondsLeft: 2400, history: [300000, 302000, 305000, 308000, 310000] },
  { id: 4, name: '수제 가죽가방', seller: 'seller_bag', myBid: 76000, price: 76000, secondsLeft: 0, history: [70000, 72000, 74000, 76000, 76000], ended: true },
]

function fmtTime(sec) {
  if (sec <= 0) return '종료'
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function Sparkline({ history }) {
  const w = 80, h = 28
  const min = Math.min(...history), max = Math.max(...history)
  const range = max - min || 1
  const pts = history
    .map((v, i) => {
      const x = (i / (history.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke="#141414" strokeWidth="1.5" />
    </svg>
  )
}

function statusOf(item) {
  if (item.ended) return { label: '낙찰완료', cls: 'done' }
  if (item.price <= item.myBid) return { label: '최고가', cls: 'top' }
  return { label: '경쟁중', cls: 'mid' }
}

export default function BidHistory() {
  const [items, setItems] = useState(initialItems)
  const [flashId, setFlashId] = useState(null)
  const flashTimeout = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        let next = prev.map((it) => ({
          ...it,
          secondsLeft: !it.ended && it.secondsLeft > 0 ? it.secondsLeft - 1 : it.secondsLeft,
        }))

        if (Math.random() < 0.4) {
          const candidates = next.filter((it) => !it.ended)
          if (candidates.length) {
            const target = candidates[Math.floor(Math.random() * candidates.length)]
            const bump = (Math.floor(Math.random() * 4) + 1) * 1000
            next = next.map((it) => {
              if (it.id !== target.id) return it
              const newPrice = it.price + bump
              const newHistory = [...it.history, newPrice].slice(-6)
              return { ...it, price: newPrice, history: newHistory }
            })
            setFlashId(target.id)
            clearTimeout(flashTimeout.current)
            flashTimeout.current = setTimeout(() => setFlashId(null), 700)
          }
        }
        return next
      })
    }, 1500)
    return () => {
      clearInterval(timer)
      clearTimeout(flashTimeout.current)
    }
  }, [])

  const totalCount = items.length
  const leadCount = items.filter((it) => !it.ended && it.price <= it.myBid).length
  const competingCount = items.filter((it) => !it.ended && it.price > it.myBid).length
  const closingSoon = items.filter((it) => !it.ended && it.secondsLeft <= 600).length

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>입찰 내역</div>
        <div className="live-label"><span className="live-dot" />실시간 시세 반영 중</div>
      </div>

      <div className="summary" style={{ margin: '18px 24px 0' }}>
        <div className="cell"><div className="label">참여 중인 경매</div><div className="value">{totalCount}</div></div>
        <div className="cell"><div className="label">최고가 유지 중</div><div className="value">{leadCount}</div></div>
        <div className="cell"><div className="label">경쟁 중</div><div className="value">{competingCount}</div></div>
        <div className="cell"><div className="label">마감 10분 이내</div><div className="value">{closingSoon}</div></div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <table className="ticker">
          <thead>
            <tr>
              <th style={{ width: '26%' }}>상품명</th>
              <th className="num">내 입찰가</th>
              <th className="num">현재가</th>
              <th className="num">차이</th>
              <th style={{ width: 90 }}>추이</th>
              <th className="num">남은시간</th>
              <th style={{ textAlign: 'center' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const diff = item.myBid - item.price
              const st = statusOf(item)
              return (
                <tr key={item.id} className={`ticker-row ${flashId === item.id ? 'flash-up' : ''}`}>
                  <td>
                    <div className="name">{item.name}</div>
                    <div className="sub">{item.seller}</div>
                  </td>
                  <td className="num mono">{item.myBid.toLocaleString()}</td>
                  <td className="num mono price">
                    {item.price.toLocaleString()} {diff < 0 && <span className="arrow-up">▲</span>}
                  </td>
                  <td className={`num mono ${diff < 0 ? 'diff-neg' : 'diff-pos'}`}>
                    {diff === 0 ? 'TOP' : (diff > 0 ? '+' : '') + diff.toLocaleString()}
                  </td>
                  <td><Sparkline history={item.history} /></td>
                  <td className="num mono">{fmtTime(item.secondsLeft)}</td>
                  <td style={{ textAlign: 'center' }}><span className={`badge3 ${st.cls}`}>{st.label}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: '#B5B5B5', marginTop: 16 }}>
          ▲ = 나보다 높은 입찰 발생(경쟁 갱신) · 가격 변동 시 셀이 잠깐 반전 강조됩니다
        </p>
      </div>
    </div>
  )
}
