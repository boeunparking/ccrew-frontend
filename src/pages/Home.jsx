import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import EventPopup from '../components/EventPopup.jsx'

const bento = [
  { id: 1, name: '원피스 루피 기어5 스케일 피규어', brand: 'Banpresto', price: 42000, tag: '마감임박', large: true },
  { id: 2, name: '귀멸의칼날 넨도로이드 네즈코', brand: 'Good Smile Company', price: 68000, tag: 'NEW' },
  { id: 3, name: '에반게리온 초합금 로봇혼', brand: 'Bandai Spirits', price: 155000, tag: '' },
  { id: 4, name: '건담 RX-78-2 PG 프라모델', brand: 'Bandai', price: 89000, tag: '' },
  { id: 5, name: '명일방주 텍사스 스케일 피규어', brand: 'Myethos', price: 132000, tag: '인기' },
]

const picks = [
  { id: 6, name: '스파이 패밀리 아냐 넨도로이드', brand: 'Good Smile Company', price: 54000, tag: '' },
  { id: 7, name: '체인소맨 파워 피규어', brand: 'Kotobukiya', price: 61000, tag: '' },
  { id: 8, name: '젤다의전설 링크 스케일 피규어', brand: 'First 4 Figures', price: 210000, tag: '' },
]

export default function Home() {
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
        {bento.map((item) => (
          <Link key={item.id} to={`/auctions/${item.id}`} className={`card ${item.large ? 'large' : ''}`}>
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
