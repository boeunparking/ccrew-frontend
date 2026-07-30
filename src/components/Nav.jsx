import { Link, useLocation } from 'react-router-dom'

const categories = [
  { label: '전체', path: '/auctions' },
  { label: '넨도로이드', path: '/auctions?cat=nendoroid' },
  { label: '스케일 피규어', path: '/auctions?cat=scale' },
  { label: '건프라·프라모델', path: '/auctions?cat=gunpla' },
  { label: '굿즈', path: '/auctions?cat=goods' },
  { label: '기타', path: '/auctions?cat=etc' },
]

export default function Nav({ showCreate = false, showCategories = true }) {
  const location = useLocation()
  const current = location.pathname + location.search

  return (
    <>
      <div className="util-bar">
        <Link to="/mypage">마이페이지</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
      <div className="topbar">
        <Link to="/" className="logo">
          CloudDuck
          <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--gray-1)', marginLeft: 6, letterSpacing: '0.02em' }}>
            클라우드덕후
          </span>
        </Link>
        <div className="navright">
          {showCreate && (
            <Link to="/auctions/new" className="btn btn-outline-solid">경매 등록</Link>
          )}
          <Link to="/bids" className="btn btn-dark">입찰내역</Link>
        </div>
      </div>
      {showCategories && (
        <div className="catnav">
          {categories.map((c) => {
            const isAll = c.label === '전체'
            const active = current === c.path || (isAll && location.pathname === '/auctions' && !location.search)
            return (
              <Link key={c.label} to={c.path} className={active ? 'active' : ''}>
                {c.label}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
