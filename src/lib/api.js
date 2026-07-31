// CloudFront가 /api/*를 ALB로 넘겨주므로 같은 출처다.
// 절대 URL도, CORS 설정도, VITE_API_URL 같은 빌드타임 환경변수도 필요 없다.
// (Vite 환경변수는 빌드 시점에 코드에 박혀서 배포 후 바꿀 수 없다는 점도 피할 수 있다.)

const TOKEN_KEY = 'cd_token';

export const auth = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  isLoggedIn: () => Boolean(localStorage.getItem(TOKEN_KEY)),
};

async function request(path, { method = 'GET', body, auth: needAuth = false } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';

  if (needAuth) {
    const token = auth.get();
    if (!token) throw new Error('로그인이 필요합니다');
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    auth.clear();
    throw new Error('세션이 만료되었습니다. 다시 로그인해 주세요');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? '요청을 처리하지 못했습니다');
  return data;
}

export const api = {
  ping: () => request('/ping'),

  // --- 인증 ---
  signup: (form) => request('/auth/signup', { method: 'POST', body: form }),
  login: async (form) => {
    const data = await request('/auth/login', { method: 'POST', body: form });
    auth.set(data.token);
    return data.user;
  },
  logout: () => auth.clear(),
  me: () => request('/auth/me', { auth: true }),

  // --- 경매 ---
  listAuctions: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== '')
    ).toString();
    return request(`/auctions${qs ? `?${qs}` : ''}`);
  },
  getAuction: (id) => request(`/auctions/${id}`),
  getRelated: (id) => request(`/auctions/${id}/related`),
  createAuction: (payload) => request('/auctions', { method: 'POST', body: payload, auth: true }),

  // --- 입찰 ---
  placeBid: (id, price) =>
    request(`/auctions/${id}/bids`, { method: 'POST', body: { price }, auth: true }),
  getBidHistory: (id) => request(`/auctions/${id}/bids`),
  myBids: () => request('/bids/me', { auth: true }),

  // --- 마이페이지 ---
  mySales: () => request('/me/sales', { auth: true }),
  myPurchases: () => request('/me/purchases', { auth: true }),
  myNotifications: () => request('/me/notifications', { auth: true }),

  // --- 관리자 ---
  adminStats: () => request('/admin/stats', { auth: true }),
  adminAuctions: () => request('/admin/auctions', { auth: true }),
  adminSuspicious: () => request('/admin/suspicious', { auth: true }),
  adminLogs: () => request('/admin/logs', { auth: true }),
  adminClaims: () => request('/admin/claims', { auth: true }),
  advanceClaim: (id) => request(`/admin/claims/${id}`, { method: 'PATCH', auth: true }),

  // --- 이미지 업로드 ---
  // 파일이 백엔드 컨테이너를 거치지 않고 브라우저에서 S3로 바로 올라간다
  uploadImage: async (file) => {
    const { uploadUrl, key, publicUrl } = await request('/uploads/presign', {
      method: 'POST',
      body: { contentType: file.type, fileName: file.name },
      auth: true,
    });

    const put = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    if (!put.ok) throw new Error('이미지 업로드에 실패했습니다');

    return { key, publicUrl };
  },
};
