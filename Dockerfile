# --- build: vite 정적 빌드 ---
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# --- runtime: nginx가 정적 파일만 서빙 ---
# API는 api.cloudduck.cloud로 직접 가므로 여기에 프록시 설정이 없다.
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.d/99-ccrew-config.sh
RUN chmod +x /docker-entrypoint.d/99-ccrew-config.sh

EXPOSE 80
