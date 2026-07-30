import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 실제 로그인 API 연동
    console.log('login', form)
    navigate('/')
  }

  return (
    <div className="page-wrap">
      <Nav showCategories={false} />
      <form className="form-wrap" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>이메일</label>
          <input name="email" type="email" placeholder="example@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>비밀번호</label>
          <input name="password" type="password" placeholder="비밀번호 입력" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="form-btn">로그인</button>
        <div className="form-link">
          계정이 없으신가요? <Link to="/signup" style={{ color: '#141414', textDecoration: 'underline' }}>회원가입</Link>
        </div>
      </form>
    </div>
  )
}
