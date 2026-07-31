import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import EventPopup from '../components/EventPopup.jsx'
import { api } from '../lib/api.js'

export default function Home() {
  const [closingSoon, setClosingSoon] = useState([])
  const [picks, setPicks] = useState([])

  useEffect(() => {
    api.listAuctions({ status: '마감임박', sort: 'endingSoon' })
      .then((d) => setClosingSoon(d.items.slice(0, 5)))
      .catch(() => {})

    api.listAuctions({ status: '진행중', sort: 'priceDesc' })
      .then((d) => setPicks(d.items.slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div className="page-wrap">
      <EventPopup />
      <Nav showCreate showCategories={false} />

      <div className="hero">
        <div className="hero-copy">
          <div className="hero-eyebrow">Weekly Drop</div>
          <div className="hero-title">이번 주, 놓치면 후회할<br />덕후들의 피규어 경매</div>
          <Link to="/auctions" className="hero-cta">경매 둘러보기</Link>
        </div>
      </div>

      <div className="section-head">
        <div>
          <div className="section-eyebrow">Closing Soon</div>
          <div className="section-title">마감 임박 경매</div>
        </div>
        <Link to="/auctions" className="section-more">전체보기 →</Link>
      </div>

      <div className="bento">
        {closingSoon.map((item, i) => (
          <Link key={item.id} to={`/auctions/${item.id}`} className={`card ${i === 0 ? 'large' : ''}`}>
            <div className="cardimg">
              {item.tag && <span className="cardtag">{item.tag}</span>}
            </div>
            <div className="brand">{item.brand}</div>
            <div className="name">{item.name}</div>
            <div className="price">{item.price.toLocaleString()}원</div>
          </Link>
        ))}
      </div>

      <div className="section-head">
        <div>
          <div className="section-eyebrow">Editor's Pick</div>
          <div className="section-title">지금 주목할 아이템</div>
        </div>
      </div>
      <div className="grid3">
        {picks.map((item) => (
          <Link key={item.id} to={`/auctions/${item.id}`} className="card">
            <div className="cardimg" />
            <div className="brand">{item.brand}</div>
            <div className="name">{item.name}</div>
            <div className="price">{item.price.toLocaleString()}원</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
