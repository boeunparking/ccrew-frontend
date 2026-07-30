import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 실제 회원가입 API 연동
    console.log('signup', form)
    navigate('/login')
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
          <input name="password" type="password" placeholder="8자 이상" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>비밀번호 확인</label>
          <input name="passwordConfirm" type="password" placeholder="비밀번호 재입력" value={form.passwordConfirm} onChange={handleChange} required />
        </div>
        <button type="submit" className="form-btn">회원가입</button>
        <div className="form-link">
          이미 계정이 있으신가요? <Link to="/login" style={{ color: '#141414', textDecoration: 'underline' }}>로그인</Link>
        </div>
      </form>
    </div>
  )
}
