import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AuctionList from './pages/AuctionList.jsx'
import AuctionDetail from './pages/AuctionDetail.jsx'
import AuctionCreate from './pages/AuctionCreate.jsx'
import BidHistory from './pages/BidHistory.jsx'
import MyPage from './pages/MyPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auctions" element={<AuctionList />} />
      <Route path="/auctions/new" element={<AuctionCreate />} />
      <Route path="/auctions/:id" element={<AuctionDetail />} />
      <Route path="/bids" element={<BidHistory />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
