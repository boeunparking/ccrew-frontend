#!/bin/sh
set -e

# nginx 공식 이미지가 기동 직전에 /docker-entrypoint.d/*.sh 를 실행해준다.
# 그래서 이 스크립트는 nginx를 직접 띄우지 않는다.
#
# 이미지 하나로 개발/스테이징/운영을 다 쓰기 위해
# API 주소를 컨테이너가 뜰 때 주입한다.
# ECS 태스크 정의의 environment에 API_BASE_URL만 넣으면 된다.
#   예: API_BASE_URL=https://api.cloudduck.cloud
#
# 값이 없으면 빈 문자열로 두고, 프론트가 자기 기본값을 쓰게 한다.
API_BASE_URL="${API_BASE_URL:-}"

cat > /usr/share/nginx/html/config.js <<EOF
window.__CCREW_CONFIG__ = {
  apiBaseUrl: '${API_BASE_URL}',
};
EOF

echo "[entrypoint] apiBaseUrl=${API_BASE_URL:-(기본값 사용)}"
