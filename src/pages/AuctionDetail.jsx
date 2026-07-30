import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

function formatTime(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const related = [
  { id: 11, name: '올드 폴라로이드', brand: 'Instant Co', price: 31000 },
  { id: 12, name: '레더 카메라 스트랩', brand: 'Craft House', price: 18000 },
  { id: 13, name: '빈티지 삼각대', brand: 'Studio Sound', price: 24000 },
]

export default function AuctionDetail() {
  const { id } = useParams()
  const [secondsLeft, setSecondsLeft] = useState(192)
  const [currentPrice, setCurrentPrice] = useState(42000)
  const [bidInput, setBidInput] = useState('')
  const [wishlisted, setWishlisted] = useState(false)
  const [flash, setFlash] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)
  const [bidderCount, setBidderCount] = useState(14)
  const [history, setHistory] = useState([
    { user: 'user_c92', price: 42000 },
    { user: 'user_a15', price: 40000 },
    { user: 'user_b77', price: 38000 },
  ])
  const flashTimeout = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const placeBid = (amount) => {
    if (!amount || amount <= currentPrice) return
    setCurrentPrice(amount)
    setHistory((prev) => [{ user: '나', price: amount }, ...prev])
    setBidderCount((c) => c + 1)
    setFlash(true)
    clearTimeout(flashTimeout.current)
    flashTimeout.current = setTimeout(() => setFlash(false), 400)
    // TODO: 실제 입찰 API 연동 (+ WebSocket 브로드캐스트)
  }

  const handleBidSubmit = (e) => {
    e.preventDefault()
    placeBid(Number(bidInput))
    setBidInput('')
  }

  const quickBid = (increment) => placeBid(currentPrice + increment)

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />

      <div className="detail-wrap">
        <div className="gallery">
          <div className="gallery-main" />
          <div className="gallery-thumbs">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`thumb ${activeThumb === i ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              />
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-brand">Leica Type · 경매 #{id}</div>
          <div className="detail-title">빈티지 필름 카메라</div>

          <div className="social-proof"><b>{bidderCount}명</b>이 입찰에 참여하고 있어요</div>

          <div className="timer-box">
            <span className="dot" />마감까지 {formatTime(secondsLeft)}
          </div>

          <div className="price-box">
            <div className="label">현재 최고가</div>
            <div className={`big ${flash ? 'flash' : ''}`}>{currentPrice.toLocaleString()}원</div>
          </div>

          <div className="quickbid-row">
            <button className="quickbid-btn" onClick={() => quickBid(1000)}>+1,000</button>
            <button className="quickbid-btn" onClick={() => quickBid(5000)}>+5,000</button>
            <button className="quickbid-btn" onClick={() => quickBid(10000)}>+10,000</button>
          </div>

          <form className="bidform" onSubmit={handleBidSubmit}>
            <input
              placeholder={`직접 입력 (최소 ${(currentPrice + 1000).toLocaleString()}원)`}
              value={bidInput}
              onChange={(e) => setBidInput(e.target.value)}
              type="number"
            />
            <button type="submit" className="btn btn-dark">입찰하기</button>
          </form>

          <div className="wishlist-row">
            <button
              className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(!wishlisted)}
              aria-label="관심 경매 등록"
            >
              {wishlisted ? '♥' : '♡'}
            </button>
            <span className="wishlist-note">관심 경매로 등록하면 마감 임박 시 알림을 받아요</span>
          </div>

          <div className="hist">
            <div className="hist-head"><span className="t">실시간 입찰 이력</span></div>
            {history.map((h, i) => (
              <div className={`row ${h.user === '나' ? 'me' : ''}`} key={i}>
                <span>{h.user}</span>
                <span>{h.price.toLocaleString()}원</span>
              </div>
            ))}
          </div>

          <div className="desc">
            <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--black)' }}>판매자: seller_hyun</div>
            1980년대 필름 카메라, 작동 확인 완료. 실사용감 있으나 기능 이상 없음. 렌즈 스크래치 없음, 셔터 정상 작동 확인.
          </div>
        </div>
      </div>

      <div className="related-strip">
        <div className="section-head" style={{ padding: '0 0 18px' }}>
          <div>
            <div className="section-eyebrow">You May Also Like</div>
            <div className="section-title">함께 보면 좋은 경매</div>
          </div>
        </div>
        <div className="grid3" style={{ padding: 0 }}>
          {related.map((item) => (
            <Link key={item.id} to={`/auctions/${item.id}`} className="card">
              <div className="cardimg" style={{ aspectRatio: '3 / 4', height: 'auto' }} />
              <div className="brand">{item.brand}</div>
              <div className="name">{item.name}</div>
              <div className="price">{item.price.toLocaleString()}원</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sticky-bid-bar">
        <div className="cur">현재가<b>{currentPrice.toLocaleString()}원</b></div>
        <button className="btn btn-dark" onClick={() => quickBid(1000)}>바로 입찰하기</button>
      </div>
    </div>
  )
}
