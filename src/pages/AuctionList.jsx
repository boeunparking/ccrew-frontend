import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

const allAuctions = [
  { id: 1, name: '빈티지 필름 카메라', brand: 'Leica Type', price: 42000, badge: '3분 남음' },
  { id: 2, name: '한정판 스니커즈', brand: 'Rare Drop', price: 128000, badge: '12분 남음' },
  { id: 3, name: '디자이너 시계', brand: 'Atelier', price: 310000, badge: '40분 남음' },
  { id: 4, name: '아날로그 턴테이블', brand: 'Studio Sound', price: 95000, badge: '1시간 남음' },
  { id: 5, name: '수제 가죽가방', brand: 'Craft House', price: 76000, badge: '2시간 남음' },
  { id: 6, name: '무선 이어폰', brand: 'Sound Lab', price: 28000, badge: '3시간 남음' },
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
