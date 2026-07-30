import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

export default function AuctionCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', startPrice: '', endTime: '', description: '' })
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setImageFile(e.target.files?.[0] ?? null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 이미지 S3 업로드 + 경매 등록 API 연동
    console.log('create auction', form, imageFile)
    navigate('/auctions')
  }

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />
      <form className="form-wrap" style={{ maxWidth: 420 }} onSubmit={handleSubmit}>
        <label className="upload-box" htmlFor="imageUpload">
          {imageFile ? imageFile.name : '+ 상품 이미지 업로드 (S3)'}
        </label>
        <input id="imageUpload" type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

        <div className="form-row">
          <label>상품명</label>
          <input name="name" placeholder="예) 빈티지 필름 카메라" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-cols2">
          <div className="form-row">
            <label>시작가</label>
            <input name="startPrice" type="number" placeholder="10000" value={form.startPrice} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>마감시간</label>
            <input name="endTime" type="datetime-local" value={form.endTime} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <label>상품 설명</label>
          <textarea name="description" placeholder="상품 상태, 특이사항 등을 입력하세요" value={form.description} onChange={handleChange} />
        </div>
        <button type="submit" className="form-btn">경매 등록하기</button>
      </form>
    </div>
  )
}
