# 클라우드 Duck — React + Vite 프론트엔드

## 실행 방법

```bash
npm install
npm run dev
```

## 페이지 구성

| 경로 | 페이지 |
|---|---|
| `/` | 홈페이지 |
| `/signup` | 회원가입 |
| `/login` | 로그인 |
| `/auctions` | 경매 상품 목록 |
| `/auctions/:id` | 경매 상품 상세 (입찰 폼, 실시간 이력) |
| `/auctions/new` | 경매 상품 등록 (판매자) |
| `/bids` | 입찰 내역 (주식창 스타일, 실시간 시세 시뮬레이션) |
| `/mypage` | 마이페이지 (판매/구매/알림 탭) |
| `/admin` | 관리자 대시보드 (실시간 시뮬레이션) |

## 다음 단계 (실제 연동 시)

- `TODO:` 주석이 달린 부분(회원가입, 로그인, 입찰, 경매 등록)에 실제 API 호출 연결
- `AuctionDetail.jsx`, `BidHistory.jsx`, `AdminDashboard.jsx`의 `setInterval` 폴링 로직을
  WebSocket 구독 또는 실제 API 폴링으로 교체
- 인증 상태에 따라 `Nav` 컴포넌트의 로그인/회원가입 버튼을 로그아웃/마이페이지로 전환하는 로직 추가
"# ccrew-frontend" 
