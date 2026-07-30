import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

const bento = [
  { id: 1, name: '빈티지 필름 카메라', brand: 'Leica Type', price: 42000, tag: '마감임박', large: true },
  { id: 2, name: '한정판 스니커즈', brand: 'Rare Drop', price: 128000, tag: 'NEW' },
  { id: 3, name: '디자이너 시계', brand: 'Atelier', price: 310000, tag: '' },
  { id: 4, name: '아날로그 턴테이블', brand: 'Studio Sound', price: 95000, tag: '' },
  { id: 5, name: '수제 가죽가방', brand: 'Craft House', price: 76000, tag: '인기' },
]

const picks = [
  { id: 6, name: '무선 이어폰', brand: 'Sound Lab', price: 28000, tag: '' },
  { id: 7, name: '클래식 선글라스', brand: 'Optique', price: 54000, tag: '' },
  { id: 8, name: '미니멀 도자기 세트', brand: 'Studio Clay', price: 61000, tag: '' },
]

export default function Home() {
  return (
    <div className="page-wrap">
      <Nav showCreate showCategories={false} />

      <div className="hero">
        <div className="hero-copy">
          <div className="hero-eyebrow">Weekly Auction</div>
          <div className="hero-title">이번 주, 놓치면 후회할<br />컬렉터 아이템들</div>
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
