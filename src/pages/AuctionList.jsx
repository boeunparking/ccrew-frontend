import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

const allAuctions = [
  { id: 1, name: '원피스 루피 기어5 스케일 피규어', brand: 'Banpresto', price: 42000, badge: '3분 남음' },
  { id: 2, name: '귀멸의칼날 넨도로이드 네즈코', brand: 'Good Smile Company', price: 68000, badge: '12분 남음' },
  { id: 3, name: '에반게리온 초합금 로봇혼', brand: 'Bandai Spirits', price: 155000, badge: '40분 남음' },
  { id: 4, name: '건담 RX-78-2 PG 프라모델', brand: 'Bandai', price: 89000, badge: '1시간 남음' },
  { id: 5, name: '명일방주 텍사스 스케일 피규어', brand: 'Myethos', price: 132000, badge: '2시간 남음' },
  { id: 6, name: '스파이 패밀리 아냐 넨도로이드', brand: 'Good Smile Company', price: 54000, badge: '3시간 남음' },
]

const filters = ['진행중', '마감임박', '종료']

export default function AuctionList() {
  const [activeFilter, setActiveFilter] = useState('진행중')

  return (
    <div className="page-wrap">
      <Nav showCreate />
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
        <button className="chip">정렬: 마감순 ▾</button>
      </div>
      <div className="grid3" style={{ paddingTop: 24 }}>
        {allAuctions.map((item) => (
          <Link key={item.id} to={`/auctions/${item.id}`} className="card">
            <div className="cardimg" style={{ aspectRatio: '3 / 4', height: 'auto' }} />
            <div className="brand">{item.brand}</div>
            <div className="name">{item.name}</div>
            <div className="price">{item.price.toLocaleString()}원</div>
            <div className="badge">{item.badge}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
