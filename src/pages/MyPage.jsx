import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

const sellItems = [
  { name: '원피스 루피 기어5 스케일 피규어', info: '현재가 42,000원', status: '진행중', statusColor: '#141414' },
  { name: '귀멸의칼날 넨도로이드 네즈코', info: '낙찰가 76,000원', status: '낙찰완료', statusColor: '#8C8C8C' },
  { name: '체인소맨 파워 피규어', info: '-', status: '유찰', statusColor: '#C4C4C4' },
]

const buyItems = [
  { name: '원피스 루피 기어5 스케일 피규어', info: '내 입찰가 42,000원', status: '최고가', statusColor: '#141414' },
  { name: '명일방주 텍사스 스케일 피규어', info: '내 입찰가 120,000원', status: '경쟁중', statusColor: '#C4C4C4' },
]

const notifications = [
  { name: '명일방주 텍사스 스케일 피규어 — 새로운 입찰이 등록되었습니다', info: '5분 전' },
  { name: '원피스 루피 기어5 스케일 피규어 — 낙찰되었습니다', info: '1시간 전' },
]

const tabs = ['판매', '구매', '알림']

export default function MyPage() {
  const [active, setActive] = useState('판매')

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={`tab ${active === t ? 'active' : ''}`} onClick={() => setActive(t)}>
            {t}
          </button>
        ))}
      </div>

      {active === '판매' && (
        <>
          <Link to="/auctions/new" className="fab">+ 새 경매 등록</Link>
          <div style={{ padding: '0 24px 24px' }}>
            {sellItems.map((item, i) => (
              <div className="listrow" key={i}>
                <span>{item.name}</span>
                <span>{item.info}</span>
                <span style={{ color: item.statusColor, fontWeight: 700 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {active === '구매' && (
        <div style={{ padding: '24px' }}>
          {buyItems.map((item, i) => (
            <div className="listrow" key={i}>
              <span>{item.name}</span>
              <span>{item.info}</span>
              <span style={{ color: item.statusColor, fontWeight: 700 }}>{item.status}</span>
            </div>
          ))}
          <Link to="/bids" style={{ fontSize: 11, color: '#8C8C8C', textDecoration: 'underline' }}>
            전체 입찰 내역 보기 →
          </Link>
        </div>
      )}

      {active === '알림' && (
        <div style={{ padding: '24px' }}>
          {notifications.map((n, i) => (
            <div className="listrow" key={i}>
              <span>{n.name}</span>
              <span style={{ color: '#B5B5B5' }}>{n.info}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
